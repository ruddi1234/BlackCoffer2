import { Router } from "express";
import {
  GetCountryData,
  GetRegionData,
  GetSectorData,
  GetTopicData,
} from "../controllers/filterController.js";
const router = Router();

router.get("/countrydata", GetCountryData);
router.get("/topicdata", GetTopicData);
router.get("/regiondata", GetRegionData);
router.get("/sectordata", GetSectorData);

export default router;
