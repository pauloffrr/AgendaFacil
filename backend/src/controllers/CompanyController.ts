import { Request, Response } from "express";
import CompanyModel from "../models/CompanyModel";

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { corporateReason, cnpj, rayKm, category, profession, userId } = req.body;

    const user = await CompanyModel.create({
      corporateReason,
      cnpj,
      rayKm,
      category,
      profession,
      userId
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);  
    res.status(500).json({ error: "Error creating company" });
  }
};

export const listCompany = async (req: Request, res: Response) => {
  try {
    const company = await CompanyModel.findAll();
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Error listing company" });
  }
};

export const getCompanyById = async (req: Request<{ id: string }>, res: Response) => {
  const company = await CompanyModel.findByPk(req.params.id)
  return res.status(200).json(company)
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const company = await CompanyModel.findByPk(id);
    if (!company) {
        return res.status(404).json({ error: "company not found" });
    }

    await company.update(data);
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Error when updating company" });
  }
};