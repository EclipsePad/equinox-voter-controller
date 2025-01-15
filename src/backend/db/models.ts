import mongoose from "mongoose";
import { IEssenceDocument, IVotersDocument } from "./types";
import { EssenceSchema, VotersSchema } from "./schemas";

export const EssenceModel = mongoose.model<IEssenceDocument>(
  "essence_model",
  EssenceSchema
);

export const VotersModel = mongoose.model<IVotersDocument>(
  "voters_model",
  VotersSchema
);
