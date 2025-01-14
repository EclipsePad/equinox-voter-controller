import { Schema } from "mongoose";
import { IEssence, IEssenceSchema, IVoters, IVotersSchema } from "./types";

export const essenceSchema = new Schema<IEssenceSchema>(
  {
    essence: {
      type: [[{ type: Schema.Types.Mixed }]],
      required: true,
      validate: {
        validator: function (v: any[]): v is IEssence {
          return v.every(
            (item) =>
              Array.isArray(item) &&
              item.length === 2 &&
              typeof item[0] === "string" &&
              typeof item[1] === "number"
          );
        },
        message: "Essence must be an array of [string, number] tuples",
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false }, collection: "essence" }
);

export const votersSchema = new Schema<IVotersSchema>(
  {
    voters: {
      type: [[{ type: Schema.Types.Mixed }]],
      required: true,
      validate: {
        validator: function (v: any[]): v is IVoters {
          return v.every(() => true);
        },
        message: "",
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false }, collection: "voters" }
);
