import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const service = new UserService();

export const listUsers = async (_req: Request, res: Response) => {
  const users = await service.list();
  res.json({ message: "Lista de usuários carregada com sucesso", data: users });
};

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await service.get(id);
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json({ message: "Usuário encontrado com sucesso", data: user });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await service.create(req.body);
    res.status(201).json({ message: "Usuário criado com sucesso", data: user });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = await service.update(id, req.body);
  if (!updated) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json({ message: "Usuário atualizado com sucesso", data: updated });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ok = await service.delete(id);
  if (!ok) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json({ message: "Usuário deletado com sucesso" });
};
