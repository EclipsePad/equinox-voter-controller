import { EssenceModel, VotersModel } from "./models";
import { IEssence, IVoters } from "./types";

export async function addEssence(essence: IEssence) {
  const model = new EssenceModel({
    essence,
  });

  return await model.save();
}

export async function getEssence() {
  return await EssenceModel.find();
}

export async function getEssenceByLatestDate() {
  return await EssenceModel.findOne().sort({ createdAt: -1 });
}

export async function getEssenceInDateRange(from: Date, to: Date = new Date()) {
  return await EssenceModel.find({
    createdAt: {
      $gte: from,
      $lte: to,
    },
  });
}

export async function addVoters(
  voters: IVoters,
  epochId: number,
  createdAt: Date = new Date()
) {
  try {
    const model = new VotersModel({
      voters,
      epochId,
      createdAt,
    });

    return await model.save();
  } catch (error) {
    if ((error as any).code === 11_000) {
      throw new Error(`Data for epoch ${epochId} already exists`);
    }
    throw error;
  }
}

export async function getVoters() {
  return await VotersModel.find();
}

export async function getVotersByLatestDate() {
  return await VotersModel.findOne().sort({ createdAt: -1 });
}

export async function getVotersInDateRange(from: Date, to: Date = new Date()) {
  return await VotersModel.find({
    createdAt: {
      $gte: from,
      $lte: to,
    },
  });
}

export async function getVotersByEpoch(epochId: number) {
  return await VotersModel.findOne({ epochId });
}

export async function getVotersByLatestEpoch() {
  return await VotersModel.findOne().sort({ epochId: -1 }).limit(1);
}

export async function getVotersInEpochRange(from: number, to: number) {
  return await VotersModel.find({
    epochId: {
      $gte: from,
      $lte: to,
    },
  }).sort({ epochId: 1 });
}
