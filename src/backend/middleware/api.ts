import { ENCODING, PATH_TO_CONFIG_JSON, readSnapshot } from "../services/utils";
import { UserListResponseItem } from "../../common/codegen/Voter.types";
import {
  Addr,
  LockerInfo,
  StakerInfo,
} from "../../common/codegen/Staking.types";
import { readFile } from "fs/promises";
import { ChainConfig, DistributedRewards } from "../../common/interfaces";
import {
  getChainOptionById,
  getContractByLabel,
} from "../../common/config/config-utils";
import { getCwQueryHelpers } from "../../common/account/cw-helpers";
import { getSgQueryHelpers } from "../../common/account/sg-helpers";
import { floor } from "../../common/utils";

const CHAIN_ID = "neutron-1";
const REWARDS_DISTRIBUTION_PERIOD = 180; // days
const REWARDS_REDUCTION_MULTIPLIER = 0.99;
const SECONDS_PER_DAY = 24 * 3_600;

// S = a * (1 - q^n) / (1 - q)
function calcGeoProgSum(a: number, q: number, n: number): number {
  return Math.ceil((a * (1 - q ** n)) / (1 - q));
}

async function getStakers(): Promise<[Addr, StakerInfo][]> {
  let stakers: [Addr, StakerInfo][] = [];

  try {
    stakers = await readSnapshot("stakers", []);
  } catch (_) {}

  return stakers;
}

async function getLockers(): Promise<[Addr, LockerInfo[]][]> {
  let lockers: [Addr, LockerInfo[]][] = [];

  try {
    lockers = await readSnapshot("lockers", []);
  } catch (_) {}

  return lockers;
}

async function getDistributedRewards(): Promise<DistributedRewards> {
  const configJsonStr = await readFile(PATH_TO_CONFIG_JSON, {
    encoding: ENCODING,
  });
  const CHAIN_CONFIG: ChainConfig = JSON.parse(configJsonStr);
  const {
    PREFIX,
    OPTION: {
      RPC_LIST: [RPC],
      DENOM,
      CONTRACTS,
    },
  } = getChainOptionById(CHAIN_CONFIG, CHAIN_ID);

  const { staking } = await getCwQueryHelpers(CHAIN_ID, RPC);
  const { getBalance } = await getSgQueryHelpers(RPC);

  const stakingAddress = getContractByLabel(CONTRACTS, "staking").ADDRESS;

  // get contract config
  const config = await staking.cwQueryConfig();
  const eclipDenom = config.staking_token;

  // get contract balances
  const stakingBalance = Number(
    (await getBalance(stakingAddress, eclipDenom)).amount
  );
  const replenished = Number((await staking.cwQueryBalances()).replenished);
  const { eclip_per_second: eclipPerSecond } =
    await staking.cwQueryRewardsReductionInfo();

  // read snapshots
  let stakers = await getStakers();
  let lockers = await getLockers();

  // remove empty records
  stakers = stakers.filter(([_address, { vaults }]) => vaults.length);
  lockers = lockers.filter(([_address, lockerInfo]) =>
    lockerInfo.reduce((acc, { vaults }) => acc + vaults.length, 0)
  );

  // calc staked, locked, unclaimed
  const [staked, unclaimedStakingRewards] = stakers.reduce(
    ([stakedAcc, unclaimedAcc], [_address, { vaults }]) => {
      vaults.forEach(({ amount, accumulated_rewards }) => {
        stakedAcc += Number(amount);
        unclaimedAcc += Number(accumulated_rewards);
      });

      return [stakedAcc, unclaimedAcc];
    },
    [0, 0]
  );

  // real locked on tiers values are not equal values from QueryState due to penalty issue in v2
  // (check SCV audit report issue #6 for details)
  let unclaimedLockingRewards = 0;
  const lockedOnTiers: number[] = lockers.reduce(
    (lockersAcc, [_address, lockerInfo]) => {
      lockerInfo.forEach(({ lock_tier, vaults }) => {
        const vaultsSum = vaults.reduce(
          (vaultsAcc, { amount, accumulated_rewards }) => {
            unclaimedLockingRewards += Number(accumulated_rewards);

            return vaultsAcc + Number(amount);
          },
          0
        );

        lockersAcc[lock_tier] += vaultsSum;
      });

      return lockersAcc;
    },
    [...Array(5)].map(() => 0)
  );

  const locked = lockedOnTiers.reduce((acc, cur) => acc + cur, 0);
  const unclaimedRewards = unclaimedStakingRewards + unclaimedLockingRewards;

  // balance = replenished + staked + locked - claimed
  // distributed = claimed + unclaimed
  const claimedRewards = replenished + staked + locked - stakingBalance;
  const distributedRewards = unclaimedRewards + claimedRewards;

  const remainingRewards = stakingBalance - staked - locked - unclaimedRewards;
  const timeDays = floor(
    remainingRewards / config.eclip_per_second / SECONDS_PER_DAY
  );

  // calc expected rewards to distribute for REWARDS_DISTRIBUTION_PERIOD
  const weeks = floor(REWARDS_DISTRIBUTION_PERIOD / 7);
  const firstDays = REWARDS_DISTRIBUTION_PERIOD - 7 * weeks;
  const firstDaysRewards = Math.ceil(
    eclipPerSecond * firstDays * SECONDS_PER_DAY
  );
  const firstWeekRewards = eclipPerSecond * 7 * SECONDS_PER_DAY;
  const amountToReplensish =
    firstDaysRewards +
    calcGeoProgSum(firstWeekRewards, REWARDS_REDUCTION_MULTIPLIER, weeks);

  return {
    staked,
    locked,
    claimedRewards,
    unclaimedRewards,
    distributedRewards,
    replenished,
    balance: stakingBalance,
    remainingRewards,
    timeDays,
    amountToReplensish,
  };
}

async function getVoters(): Promise<UserListResponseItem[]> {
  let voters: UserListResponseItem[] = [];

  try {
    voters = await readSnapshot("voters", []);
  } catch (_) {}

  return voters;
}

export { getStakers, getLockers, getDistributedRewards, getVoters };
