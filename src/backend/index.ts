import express from "express";
import { l, wait } from "../common/utils";
import { text, json } from "body-parser";
import cors from "cors";
import { api } from "./routes/api";
import rateLimit from "express-rate-limit";
import { readFile } from "fs/promises";
import * as h from "helmet";
import { PORT, SEED } from "./envs";
import { ENCODING, PATH_TO_CONFIG_JSON, writeSnapshot } from "./services/utils";
import { ChainConfig } from "../common/interfaces";
import { getChainOptionById } from "../common/config/config-utils";
import { getSigner } from "./account/signer";
import {
  getCwExecHelpers,
  getCwQueryHelpers,
} from "../common/account/cw-helpers";

const CHAIN_ID = "neutron-1";

const STAKING = {
  PAGINATION_AMOUNT: 100,
  SNAPSHOT_PERIOD: 3_600, // seconds
};

const VOTER = {
  PAGINATION_AMOUNT: 15,
  PUSH_PERIOD: 60, // seconds
  SETTLE_PERIOD: 10, // seconds
};

const limiter = rateLimit({
  windowMs: 60 * 1e3, // 1 minute
  max: 30, // Limit each IP to 30 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (_req, res) => res.send("Request rate is limited"),
});

const app = express()
  .disable("x-powered-by")
  .use(
    h.crossOriginEmbedderPolicy({ policy: "credentialless" }),
    h.crossOriginOpenerPolicy(),
    h.crossOriginResourcePolicy(),
    h.dnsPrefetchControl(),
    h.frameguard(),
    h.hidePoweredBy(),
    h.hsts(),
    h.ieNoOpen(),
    h.noSniff(),
    h.permittedCrossDomainPolicies(),
    h.referrerPolicy(),
    h.xssFilter(),
    limiter,
    cors(),
    text(),
    json()
  );

app.use("/api", api);

app.listen(PORT, async () => {
  const configJsonStr = await readFile(PATH_TO_CONFIG_JSON, {
    encoding: ENCODING,
  });
  const CHAIN_CONFIG: ChainConfig = JSON.parse(configJsonStr);
  const {
    PREFIX,
    OPTION: {
      RPC_LIST: [RPC],
      DENOM,
      GAS_PRICE_AMOUNT,
    },
  } = getChainOptionById(CHAIN_CONFIG, CHAIN_ID);

  const gasPrice = `${GAS_PRICE_AMOUNT}${DENOM}`;
  const { signer, owner } = await getSigner(PREFIX, SEED);
  const { staking, voter } = await getCwQueryHelpers(CHAIN_ID, RPC);
  const h = await getCwExecHelpers(CHAIN_ID, RPC, owner, signer);

  console.clear();
  l(`\n✔️ Server is running on PORT: ${PORT}`);

  // service to make vaults snapshots
  setInterval(async () => {
    const stakers = await staking.pQueryStakerList(STAKING.PAGINATION_AMOUNT);
    const lockers = await staking.pQueryLockerList(STAKING.PAGINATION_AMOUNT);
    await writeSnapshot("stakers", stakers);
    await writeSnapshot("lockers", lockers);
  }, STAKING.SNAPSHOT_PERIOD * 1e3);

  // service to update voter state and make voters snapshots
  let isSnapshotUpdated = false;
  while (true) {
    // try push
    await wait(VOTER.PUSH_PERIOD * 1e3);
    try {
      await h.voter.cwPushByAdmin(gasPrice);
      await wait(VOTER.SETTLE_PERIOD * 1e3);
    } catch (error) {
      l(error);
    }

    try {
      const { rewards_claim_stage } = await voter.cwQueryOperationStatus();
      l({ isSnapshotUpdated, rewardsClaimStage: rewards_claim_stage });

      // make snapshot single time when votes will be applied
      if (!isSnapshotUpdated && rewards_claim_stage === "unclaimed") {
        const users = await voter.pQueryUserList(VOTER.PAGINATION_AMOUNT);
        await writeSnapshot("voters", users);
        isSnapshotUpdated = true;
      }

      // reset snapshot flag
      if (isSnapshotUpdated && rewards_claim_stage === "swapped") {
        isSnapshotUpdated = false;
      }
    } catch (error) {
      l(error);
    }
  }
});
