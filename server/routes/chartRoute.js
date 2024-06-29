import { Router } from "express";
import {
  CountryVsTopic,
  IntensityVsLikelihood,
  RegionVsRelevance,
  RelevanceVsYear,
} from "../controllers/chartController.js";

const router = Router();

router.get("/check", (req, res) => {
  console.log("Received a check request");
  res.status(200).send("Check successful");
});

router.get("/intensityvslikelihood", IntensityVsLikelihood);
router.get("/relevancevsyear", RelevanceVsYear);
router.get("/countryvstopic", CountryVsTopic);
router.get("/regionvsrelevance", RegionVsRelevance);

export default router;
