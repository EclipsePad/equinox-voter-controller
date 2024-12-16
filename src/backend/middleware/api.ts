import { UserListResponseItem } from "../../common/codegen/Voter.types";
import { readSnapshot } from "../services/utils";

async function getVoters() {
  let voters: UserListResponseItem[] = [];

  try {
    voters = await readSnapshot("voters", []);
  } catch (_) {}

  return voters;
}

export { getVoters };
