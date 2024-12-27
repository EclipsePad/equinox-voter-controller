import { readSnapshot } from "../services/utils";
import { UserListResponseItem } from "../../common/codegen/Voter.types";
import {
  Addr,
  LockerInfo,
  StakerInfo,
} from "../../common/codegen/Staking.types";

async function getStakers() {
  let stakers: [Addr, StakerInfo][] = [];

  try {
    stakers = await readSnapshot("stakers", []);
  } catch (_) {}

  return stakers;
}

async function getLockers() {
  let lockers: [Addr, LockerInfo[]][] = [];

  try {
    lockers = await readSnapshot("lockers", []);
  } catch (_) {}

  return lockers;
}

async function getVoters() {
  let voters: UserListResponseItem[] = [];

  try {
    voters = await readSnapshot("voters", []);
  } catch (_) {}

  return voters;
}

export { getStakers, getLockers, getVoters };
