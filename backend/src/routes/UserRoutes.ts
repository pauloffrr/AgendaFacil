import { Router } from "express";
import { createUser, getUserById, listUser, updateUser } from "../controllers/UserController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.post("/", createUser);

router.get("/", authMiddleware, listUser);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);

export default router;