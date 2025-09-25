import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import CompanyModel from "../models/CompanyModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { 
      name, 
      cpf, 
      phone, 
      state, 
      city, 
      street, 
      number, 
      complement, 
      email, 
      password,
      type,
      company 
    } = req.body;

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
      password,
      type
    });

    if(type === "COMPANY" && company) {
      await CompanyModel.create({
        corporateReason: company.corporateReason,
        cnpj: company.cnpj,
        rayKm: company.rayKm,
        category: company.category,
        profession: company.profession,
        userId: user.idUser
      })
    }

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
    const loggedUser = req.body.user.idUser
    const idUserUpdate = Number(req.params.id)

    if (Number(loggedUser) !== idUserUpdate) {
      return res.status(403).json({ error: "You do not have permission to edit this user" })
    }

    const { 
      name, 
      cpf, 
      phone, 
      state, 
      city, 
      street, 
      number, 
      complement, 
      email, 
      currentPassword,
      newPassword
    } = req.body;

    if( !name || !cpf || !phone || !state || !city || !street || !number || !complement ) {
      return res.status(400)
        .json({error: "All fields are mandatory"})
    }

    const user = await UserModel.findByPk(req.params.id)

    if(!user) {
      return res.status(404)
        .json({error: "User not found"})
    }

    if (email && email !== user.email) {
      return res.status(400).json({ message: "Changing email is not allowed." })
    }

    user.name = name
    user.cpf = cpf
    user.phone = phone
    user.state = state
    user.city = city
    user.street = street
    user.number = number
    user.complement = complement

    if (currentPassword && newPassword) {
      const correctPassword = await user.validatePassword(currentPassword)

      if (!correctPassword) {
        return res.status(401).json({ error: "Incorrect current password" })
      }

      const validatePasswordLevel = UserModel.validatePasswordLevel(newPassword)

      if (!validatePasswordLevel.validate) {
        return res.status(400).json({ 
          error: "Password too weak",
          details: validatePasswordLevel.requirements
        })
      }

      user.password = newPassword
    }

    await user.save()
    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json("Internal server error " + error)
  }
};