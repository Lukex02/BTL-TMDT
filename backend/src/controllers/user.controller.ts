import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "src/services/user.service";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}