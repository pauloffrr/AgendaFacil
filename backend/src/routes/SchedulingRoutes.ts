import { Router } from "express";
import { createScheduling, getScheduling, updateScheduling, deleteScheduling } from "../controllers/SchedulingController";

const router = Router();

router.post("/", createScheduling);
router.get("/", getScheduling);
router.put("/:id", updateScheduling);
router.delete("/:id", deleteScheduling);

export default router;