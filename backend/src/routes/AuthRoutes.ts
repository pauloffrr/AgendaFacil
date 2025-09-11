import { Router } from "express";
import { login } from "../controllers/AuthController";

const r = Router();
r.post("/login", login);

export default r;
