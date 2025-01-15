import { Schema } from "mongoose";
import {
  IEssence,
  IEssenceSchema,
  isStringNumber,
  IVotersSchema,
} from "./types";

export const EssenceSchema = new Schema<IEssenceSchema>(
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
  {
    timestamps: { createdAt: true, updatedAt: false },
    minimize: true,
    strict: true,
    collection: "essence",
  }
);

const RewardsItemSchema = new Schema(
  {
    amount: {
      type: String,
      required: true,
      validate: {
        validator: isStringNumber,
        message: "amount must be a string representation of a number",
      },
    },
    symbol: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: false,
  }
);

const RewardsInfoSchema = new Schema(
  {
    last_update_epoch: {
      type: Number,
      required: true,
    },
    value: {
      type: [RewardsItemSchema],
      required: true,
      default: [],
    },
  },
  {
    _id: false,
    timestamps: false,
  }
);

const EssenceInfoSchema = new Schema(
  {
    locking_amount: {
      type: String,
      required: true,
      validate: {
        validator: isStringNumber,
        message: "locking_amount must be a string representation of a number",
      },
    },
    staking_components: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) =>
          value.length === 2 && value.every(isStringNumber),
        message: "staking_components must be an array of two string numbers",
      },
    },
  },
  {
    _id: false,
    timestamps: false,
  }
);

const WeightAllocationItemSchema = new Schema(
  {
    lp_token: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
      validate: {
        validator: isStringNumber,
        message: "weight must be a string representation of a decimal",
      },
    },
  },
  {
    _id: false,
    timestamps: false,
  }
);

const UserResponseSchema = new Schema(
  {
    essence_info: {
      type: EssenceInfoSchema,
      required: true,
    },
    essence_value: {
      type: String,
      required: true,
      validate: {
        validator: isStringNumber,
        message: "essence_value must be a string representation of a number",
      },
    },
    rewards: {
      type: RewardsInfoSchema,
      required: true,
    },
    user_type: {
      type: String,
      required: true,
      enum: ["elector", "delegator", "slacker"],
    },
    weights: {
      type: [WeightAllocationItemSchema],
      required: true,
      default: [],
    },
  },
  {
    _id: false,
    timestamps: false,
  }
);

const UserListResponseItemSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    user_info: {
      type: [UserResponseSchema],
      required: true,
      default: [],
    },
  },
  {
    _id: false,
    timestamps: false,
  }
);

export const VotersSchema = new Schema<IVotersSchema>(
  {
    voters: {
      type: [UserListResponseItemSchema],
      required: true,
      default: [],
    },
    epochId: {
      type: Number,
      required: true,
      validate: {
        validator: (value: number) => value > 0 && Number.isInteger(value),
        message: "epochId must be a positive integer",
      },
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    minimize: true,
    strict: true,
    collection: "voters",
  }
).index({ epochId: 1 }, { unique: true });
