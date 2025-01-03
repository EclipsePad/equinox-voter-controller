import { l, Request } from "../../common/utils";
import { writeSnapshot } from "./utils";
import { BASE_URL } from "../envs";
import { ROUTE } from "../routes/api";
import { SNAPSHOT } from "../constants";

async function main() {
  try {
    const req = new Request({ baseURL: `${BASE_URL}/api` });

    const stakers = await req.get(ROUTE.GET_STAKERS);
    await writeSnapshot(SNAPSHOT.STAKERS, stakers);

    const lockers = await req.get(ROUTE.GET_LOCKERS);
    await writeSnapshot(SNAPSHOT.LOCKERS, lockers);

    const stakingEssence = await req.get(ROUTE.GET_STAKING_ESSENCE);
    await writeSnapshot(SNAPSHOT.STAKING_ESSENCE, stakingEssence);

    const lockingEssence = await req.get(ROUTE.GET_LOCKING_ESSENCE);
    await writeSnapshot(SNAPSHOT.LOCKING_ESSENCE, lockingEssence);

    const voters = await req.get(ROUTE.GET_VOTERS);
    await writeSnapshot(SNAPSHOT.VOTERS, voters);
  } catch (error) {
    l(error);
  }
}

main();
