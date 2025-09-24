import { Router } from "express";
import { createCompany, getCompanyById, listCompany, updateCompany } from "../controllers/CompanyController"

const router = Router();
router.post("/", createCompany);

router.get("/", listCompany);
router.get("/:id", getCompanyById);
router.put("/:id", updateCompany);

export default router;