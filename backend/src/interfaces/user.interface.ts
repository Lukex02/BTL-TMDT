import { UserDto } from "src/dtos/user";

export interface IUserService {
  getAll(): Promise<UserDto[]>;
  getById(userId: string): Promise<UserDto | null>;
  getByUsername(username: string): Promise<UserDto | null>;
  getByRole(role: string): Promise<UserDto[]>;
  updateUser(update: UserDto): Promise<any>;
  deleteUser(userId: string): Promise<any>;
}
