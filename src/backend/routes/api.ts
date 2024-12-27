import express from "express";
import {
  getStakers,
  getLockers,
  getDistributedRewards,
  getVoters,
} from "../controllers/api";

const router = express.Router();

const ROUTES = {
  getStakers: "/get-stakers",
  getLockers: "/get-lockers",
  getDistributedRewards: "/get-distributed-rewards",
  getVoters: "/get-voters",
};

router
  .get(ROUTES.getStakers, getStakers)
  .get(ROUTES.getLockers, getLockers)
  .get(ROUTES.getDistributedRewards, getDistributedRewards)
  .get(ROUTES.getVoters, getVoters);

export { router as api, ROUTES };
