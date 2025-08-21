import { Router } from "express";
import UserRoutes from "./UserRoutes";


const r = Router();
r.use("/users", UserRoutes);


export default r;
