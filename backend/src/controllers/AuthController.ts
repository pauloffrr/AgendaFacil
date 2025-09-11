
import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const service = new UserService();

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Email e senha obrigatórios" });
    const user = await service.authenticate(email, password);
    return res.json({ message: "Logado com Sucesso ", user });
  } catch (e: any) {
    return res.status(401).json({ error: e.message });
  }
}
