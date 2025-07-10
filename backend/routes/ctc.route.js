import express from "express";
import { calculateCTC } from "../controllers/ctc.controller.js";

const router = express.Router();

router.post("/calculate-ctc", calculateCTC);

export default router;
