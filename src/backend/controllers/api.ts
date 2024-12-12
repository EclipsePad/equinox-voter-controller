import { Request, Response } from "express";
import { getVoters as _getVoters } from "../middleware/api";

async function getVoters(_req: Request, res: Response) {
  const data = await _getVoters();
  res.json(data);
}

export { getVoters };
