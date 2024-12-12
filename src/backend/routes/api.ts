import express from "express";
import { getVoters } from "../controllers/api";

const router = express.Router();

const ROUTES = {
  getVoters: "/get-voters",
};

router.get(ROUTES.getVoters, getVoters);

export { router as api, ROUTES };
