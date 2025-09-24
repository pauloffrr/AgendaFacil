import { Request, Response } from "express";
import UserModel from "../models/UserModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, cpf, phone, state, city, street, number, complement, email, password } = req.body;

    const user = await UserModel.create({
      name,
      cpf,
      phone,
      state,
      city,
      street,
      number,
      complement,
      email,
      password
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);  
    res.status(500).json({ error: "Error creating user" });
  }
};

export const listUser = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error listing users" });
  }
};

export const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  const user = await UserModel.findByPk(req.params.id)
  return res.status(200).json(user)
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const user = await UserModel.findByPk(id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    await user.update(data);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error when updating user" });
  }
};