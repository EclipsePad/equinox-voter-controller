import { EssenceModel, VotersModel } from "./models";
import { IEssence, IVoters } from "./types";

export async function addEssence(essence: IEssence) {
  const model = new EssenceModel({
    essence,
  });

  return await model.save();
}

export async function getAllEssence() {
  return await EssenceModel.find();
}

export async function getEssenceInDateRange(from: Date, to: Date = new Date()) {
  return await EssenceModel.find({
    createdAt: {
      $gte: from,
      $lte: to,
    },
  });
}

export async function addVoters(voters: IVoters) {
  const model = new VotersModel({
    voters,
  });

  return await model.save();
}

export async function getAllVoters() {
  return await VotersModel.find();
}
