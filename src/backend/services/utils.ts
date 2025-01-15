import { readFile, writeFile } from "fs/promises";
import { floor, getLast, l } from "../../common/utils";
import { rootPath, SEED } from "../envs";
import { Label } from "../../common/config";
import { StoreArgs } from "../../common/interfaces";

const ENCODING = "utf8";
const PATH_TO_CONFIG_JSON = rootPath("./src/common/config/config.json");

// "$CHAIN_ID|$LABEL_A,$LABEL_B"
function parseStoreArgs(): StoreArgs {
  const args = getLast(process.argv).trim();
  if (args.includes("/")) throw new Error("Store args are not specified!");

  const [chainId, labelListString] = args.split("|");
  const labelList = labelListString.split(",").map((x) => x as Label);

  return {
    chainId,
    labelList,
  };
}

function parseChainId(): string {
  const arg = getLast(process.argv).trim();
  if (arg.includes("/")) throw new Error("Network name is not specified!");

  return arg;
}

/**
 * Converts a Unix epoch time (in seconds) to a human-readable date string in the format "DD.MM.YYYY HH:MM:SS".
 * @param unixTimestamp Unix epoch time in seconds
 * @returns Human-readable date string in the format "DD.MM.YYYY HH:MM:SS"
 */
function epochToDateString(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

/**
 * Converts a human-readable date string in the format "DD.MM.YYYY HH:MM:SS" to a Unix epoch time (in seconds).
 * @param dateString Human-readable date string in the format "DD.MM.YYYY HH:MM:SS"
 * @returns Unix epoch time in seconds
 */
function dateStringToEpoch(dateString: string): number {
  const [date, time] = dateString.split(" ");
  const [day, month, year] = date.split(".");
  const [hours, minutes, seconds] = time.split(":");
  const timestamp = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
    parseInt(seconds)
  );

  return Math.floor(timestamp.getTime() / 1000);
}

/**
 * Converts a Unix epoch time (in seconds) to a human-readable date string in the format "DD.MM.YYYY HH:MM:SS" (UTC).
 * @param unixTimestamp Unix epoch time in seconds
 * @returns Human-readable date string in the format "DD.MM.YYYY HH:MM:SS" (UTC)
 */
function epochToDateStringUTC(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

/**
 * Converts a human-readable date string in the format "DD.MM.YYYY HH:MM:SS" to a Unix epoch time (in seconds) (UTC).
 * @param dateString Human-readable date string in the format "DD.MM.YYYY HH:MM:SS"
 * @returns Unix epoch time in seconds (UTC)
 */
function dateStringToEpochUTC(dateString: string): number {
  const [date, time] = dateString.split(" ");
  const [day, month, year] = date.split(".");
  const [hours, minutes, seconds] = time.split(":");
  const timestamp = new Date(
    Date.UTC(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds)
    )
  );

  return Math.floor(timestamp.getTime() / 1000);
}

async function specifyTimeout(
  promise: Promise<any>,
  timeout: number = 5_000,
  exception: Function = () => {
    throw new Error("Timeout!");
  }
) {
  let timer: NodeJS.Timeout;

  return Promise.race([
    promise,
    new Promise((_r, rej) => (timer = setTimeout(rej, timeout, exception))),
  ]).finally(() => clearTimeout(timer));
}

function getLocalBlockTime(): number {
  return floor(Date.now() / 1e3);
}

function getBlockTime(blockTimeOffset: number): number {
  return blockTimeOffset + getLocalBlockTime();
}

async function writeSnapshot(fileName: string, file: any) {
  const path = rootPath(`./src/backend/services/snapshots/${fileName}.json`);

  await writeFile(path, JSON.stringify(file), {
    encoding: ENCODING,
  });
}

async function readSnapshot<T>(fileName: string, defaultValue: T): Promise<T> {
  const path = rootPath(`./src/backend/services/snapshots/${fileName}.json`);
  const data = (
    await readFile(path, {
      encoding: ENCODING,
    })
  ).trim();

  return data ? JSON.parse(data) : defaultValue;
}

interface TaskScheduler {
  scheduleTask: (targetHour: number, taskFunction: () => Promise<void>) => void;
  getTimeUntilTarget: (targetHour: number) => number;
}

class ScheduledTaskRunner implements TaskScheduler {
  scheduleTask(targetHour: number, taskFunction: () => Promise<void>): void {
    const timeUntilTarget = this.getTimeUntilTarget(targetHour);
    l(`Task scheduled to run in ${timeUntilTarget / (60 * 1e3)} minutes`);

    setTimeout(async () => {
      try {
        await taskFunction();
      } catch (_) {}
    }, timeUntilTarget);
  }

  getTimeUntilTarget(targetHour: number): number {
    const now: Date = new Date();
    const targetTime: Date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      targetHour,
      0,
      0
    );

    // If it's already past target hour UTC, schedule for next day
    if (now.getUTCHours() >= targetHour) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    return targetTime.getTime() - now.getTime();
  }
}

export {
  ENCODING,
  PATH_TO_CONFIG_JSON,
  parseChainId,
  parseStoreArgs,
  epochToDateString,
  dateStringToEpoch,
  epochToDateStringUTC,
  dateStringToEpochUTC,
  specifyTimeout,
  getLocalBlockTime,
  getBlockTime,
  writeSnapshot,
  readSnapshot,
  ScheduledTaskRunner,
};
