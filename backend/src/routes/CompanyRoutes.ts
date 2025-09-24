import { Router } from "express";
import { createCompany, getCompanyById, listCompany, updateCompany } from "../controllers/CompanyController"
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.post("/", createCompany);

router.get("/", authMiddleware, listCompany);
router.get("/:id", authMiddleware, getCompanyById);
router.put("/:id", authMiddleware, updateCompany);

export default router;