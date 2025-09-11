import { Router } from "express";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/UserController";

const r = Router();
r.get("/", listUsers);
r.get("/:id", getUser);
r.post("/", createUser);
r.put("/:id", updateUser);
r.delete("/:id", deleteUser);

export default r;
