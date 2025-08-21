import { User } from "../models/UserModel";
import { nextId } from "../utils/id";

const users: User[] = [
  { id_user: 1, name: "Samuel", email: "samuelernandes@gmail.com", phone: "11999999999", password: "123456", cpf: "114.007.519-50" },
  { id_user: 2, name: "Paulo", email: "pauloguerra@gmail.com.com", phone: "11988888888", password: "123456", cpf: "904.342.320-33" },
  { id_user: 3, name: "Milena", email: "milena@gmail.com.com", phone: "44998463322", password: "123456", cpf: "188.444.870-47"},
];

export interface IUserRepo {
  list(): Promise<User[]>;
  findById(id: number): Promise<User | undefined>;
  create(data: Omit<User, "id_user">): Promise<User>;
  update(id: number, data: Partial<Omit<User, "id_user">>): Promise<User | undefined>;
  remove(id: number): Promise<boolean>;
}

export class UserRepoMock implements IUserRepo {
  async list() { return users; }
  async findById(id: number) { return users.find(u => u.id_user === id); }
  async create(data: Omit<User, "id_user">) {
    const novo: User = { id_user: nextId(), ...data };
    users.push(novo);
    return novo;
  }
  async update(id: number, data: Partial<Omit<User, "id_user">>) {
    const u = users.find(u => u.id_user === id);
    if (!u) return undefined;
    Object.assign(u, data);
    return u;
    }
  async remove(id: number) {
    const idx = users.findIndex(u => u.id_user === id);
    if (idx === -1) return false;
    users.splice(idx, 1);
    return true;
  }
}
