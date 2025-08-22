import { Router } from "express";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";

const r = Router();
r.use("/users", UserRoutes);
r.use("/", AuthRoutes);


export default r;
