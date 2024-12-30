import { Request, Response } from "express";
import {
  getStakers as _getStakers,
  getLockers as _getLockers,
  getDistributedRewards as _getDistributedRewards,
  getVoters as _getVoters,
} from "../middleware/api";

export async function getStakers(_req: Request, res: Response) {
  const data = await _getStakers();
  res.json(data);
}

export async function getLockers(_req: Request, res: Response) {
  const data = await _getLockers();
  res.json(data);
}

export async function getDistributedRewards(_req: Request, res: Response) {
  const data = await _getDistributedRewards();
  res.json(data);
}

export async function getVoters(_req: Request, res: Response) {
  const data = await _getVoters();
  res.json(data);
}
