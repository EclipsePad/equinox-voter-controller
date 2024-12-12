import { getSigner } from "../account/signer";
import { getLast, l, li, wait } from "../../common/utils";
import { readFile } from "fs/promises";
import { ChainConfig } from "../../common/interfaces";
import { ADDRESS } from "../../common/config";
import {
  ENCODING,
  PATH_TO_CONFIG_JSON,
  parseStoreArgs,
  writeSnapshot,
} from "./utils";
import {
  getChainOptionById,
  getContractByLabel,
} from "../../common/config/config-utils";
import {
  getSgQueryHelpers,
  getSgExecHelpers,
} from "../../common/account/sg-helpers";
import {
  getCwExecHelpers,
  getCwQueryHelpers,
} from "../../common/account/cw-helpers";
import { SEED } from "../envs";

async function main() {
  try {
    const { chainId } = parseStoreArgs();
    const configJsonStr = await readFile(PATH_TO_CONFIG_JSON, {
      encoding: ENCODING,
    });
    const CHAIN_CONFIG: ChainConfig = JSON.parse(configJsonStr);
    const {
      NAME,
      PREFIX,
      OPTION: {
        RPC_LIST: [RPC],
        DENOM,
        CONTRACTS,
        GAS_PRICE_AMOUNT,
        TYPE,
      },
    } = getChainOptionById(CHAIN_CONFIG, chainId);

    const gasPrice = `${GAS_PRICE_AMOUNT}${DENOM}`;

    const { signer, owner } = await getSigner(PREFIX, SEED);

    const sgQueryHelpers = await getSgQueryHelpers(RPC);
    const sgExecHelpers = await getSgExecHelpers(RPC, owner, signer);

    const { voter } = await getCwQueryHelpers(chainId, RPC);
    const h = await getCwExecHelpers(chainId, RPC, owner, signer);

    const { getBalance, getAllBalances } = sgQueryHelpers;
    const { sgMultiSend, sgSend } = sgExecHelpers;
    console.clear();

    const users = await voter.pQueryUserList(15);
    await writeSnapshot("voters", users);
  } catch (error) {
    l(error);
  }
}

main();
