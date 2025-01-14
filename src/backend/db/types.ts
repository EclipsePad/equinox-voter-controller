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
}
export interface IVotersDocument extends Document {
  voters: IVoters;
}
