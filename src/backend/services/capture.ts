import { l, Request } from "../../common/utils";
import { writeSnapshot } from "./utils";
import { BASE_URL } from "../envs";
import { ROUTES } from "../routes/api";

async function main() {
  try {
    const req = new Request({ baseURL: `${BASE_URL}/api` });

    const stakers = await req.get(ROUTES.getStakers);
    await writeSnapshot("stakers", stakers);

    const lockers = await req.get(ROUTES.getLockers);
    await writeSnapshot("lockers", lockers);

    const voters = await req.get(ROUTES.getVoters);
    await writeSnapshot("voters", voters);
  } catch (error) {
    l(error);
  }
}

main();
