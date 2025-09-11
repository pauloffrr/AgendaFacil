import { User } from "../models/UserModel";
import { IUserRepo, UserRepoMock } from "../mock/UserMock";

// Função util p/ não expor a senha
const toPublicUser = (u: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safe } = u as any;
  return safe as Omit<User, "password">;
};

export class UserService {
  constructor(private repo: IUserRepo = new UserRepoMock()) {}

  async list(): Promise<Omit<User, "password">[]> {
    const users = await this.repo.list();
    return users.map(toPublicUser);
  }

  async get(id: number): Promise<Omit<User, "password"> | undefined> {
    const u = await this.repo.findById(id);
    return u ? toPublicUser(u) : undefined;
  }

  async create(input: Omit<User, "id_user">): Promise<Omit<User, "password">> {
    const name = (input.name || "").trim();
    const email = (input.email || "").trim().toLowerCase();
    const phone = (input.phone || "").trim();
    const password = (input.password || "").trim();
    const cpf = input.cpf ?? null;

    if (!name || !email || !phone || !password) {
      throw new Error("Campos obrigatórios: name, email, phone, password");
    }

    // evita e-mail duplicado
    const exists = await this.findByEmail(email);
    if (exists) {
      throw new Error("Já existe um usuário com este e-mail");
    }

    const created = await this.repo.create({ name, email, phone, password, cpf });
    return toPublicUser(created);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const normalized = (email || "").trim().toLowerCase();
    const users = await this.repo.list();
    return users.find(u => u.email.toLowerCase() === normalized);
  }

  async update(id: number, data: Partial<Omit<User, "id_user">>): Promise<Omit<User, "password"> | undefined> {
    const patch: Partial<Omit<User, "id_user">> = { ...data };
    if (patch.email) patch.email = patch.email.trim().toLowerCase();

    // se for trocar e-mail, valida duplicidade
    if (patch.email) {
      const found = await this.findByEmail(patch.email);
      if (found && found.id_user !== id) {
        throw new Error("Já existe um usuário com este e-mail");
      }
    }

    const updated = await this.repo.update(id, patch);
    return updated ? toPublicUser(updated) : undefined;
  }

  async delete(id: number): Promise<boolean> {
    return this.repo.remove(id);
  }

  // Login mockado (sem bcrypt/JWT por enquanto)
  async authenticate(email: string, password: string): Promise<Omit<User, "password">> {
    const user = await this.findByEmail(email);
    if (!user) throw new Error("Usuário não encontrado");
    if (user.password !== password) throw new Error("Senha incorreta");
    return toPublicUser(user);
  }
}
