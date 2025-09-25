import express from "express"
import { loginUser, userLogged } from "../controllers/LoginController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

router.get("/user/profile", authMiddleware, userLogged)
router.post("/", loginUser)

export default router