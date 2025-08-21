import { User } from "../models/UserModel";
import { IUserRepo, UserRepoMock } from "../mock/UserMock";

export class UserService {
  constructor(private repo: IUserRepo = new UserRepoMock()) {}

  list() { return this.repo.list(); }
  get(id: number) { return this.repo.findById(id); }

  async create(input: Omit<User, "id_user">) {
    
    if (!input.name || !input.email || !input.phone || !input.password) {
      throw new Error("Campos obrigatórios: name, email, phone, password");
    }
    return this.repo.create(input);
  }

  update(id: number, data: Partial<Omit<User,"id_user">>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.remove(id);
  }
}
