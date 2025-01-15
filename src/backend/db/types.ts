import { Document } from "mongoose";
import { UserListResponseItem } from "../../common/codegen/Voter.types";

export type IEssence = [string, number][];
export interface IEssenceSchema {
  essence: IEssence;
}
export interface IEssenceDocument extends Document {
  essence: IEssence;
}

export type IVoters = UserListResponseItem[];
export interface IVotersSchema {
  voters: IVoters;
  epochId: number;
}
export interface IVotersDocument extends IVotersSchema, Document {}

// to validate string numbers: Uint128, Decimal
export function isStringNumber(value: string): boolean {
  return !isNaN(Number(value));
}
