import { User } from "../models/user";

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(userId: string): Promise<User | null>;
  getByUsername(username: string): Promise<User | null>;
  getByRole(role: string): Promise<User[]>;
  createUser(user: User): Promise<any>;
  updateUser(update: User): Promise<any>;
  deleteUser(userId: string): Promise<any>;
}
