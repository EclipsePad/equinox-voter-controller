import express from "express";
import { getStakers, getLockers, getVoters } from "../controllers/api";

const router = express.Router();

const ROUTES = {
  getStakers: "/get-stakers",
  getLockers: "/get-lockers",
  getVoters: "/get-voters",
};

router
  .get(ROUTES.getStakers, getStakers)
  .get(ROUTES.getLockers, getLockers)
  .get(ROUTES.getVoters, getVoters);

export { router as api, ROUTES };
