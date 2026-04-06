import {
  LoginDto,
  RefreshDto,
  RegisterDto,
  UpdatePasswordDto,
} from 'src/dtos/auth';

export interface IAuthService {
  login(loginDto: LoginDto): Promise<any>;
  register(registerDto: RegisterDto): Promise<any>;
  logout(): Promise<any>;
  refresh(refreshDto: RefreshDto): Promise<any>;
  updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<any>;
  getUser(): Promise<any>;
}
