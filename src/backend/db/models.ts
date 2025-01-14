import mongoose from "mongoose";
import { IEssenceDocument, IVotersDocument } from "./types";
import { essenceSchema, votersSchema } from "./schemas";

export const EssenceModel = mongoose.model<IEssenceDocument>(
  "essence_model",
  essenceSchema
);

export const VotersModel = mongoose.model<IVotersDocument>(
  "voters_model",
  votersSchema
);
