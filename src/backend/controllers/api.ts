import { Request, Response } from "express";
import {
  getStakers as _getStakers,
  getLockers as _getLockers,
  getVoters as _getVoters,
} from "../middleware/api";

async function getStakers(_req: Request, res: Response) {
  const data = await _getStakers();
  res.json(data);
}

async function getLockers(_req: Request, res: Response) {
  const data = await _getLockers();
  res.json(data);
}

async function getVoters(_req: Request, res: Response) {
  const data = await _getVoters();
  res.json(data);
}

export { getStakers, getLockers, getVoters };
