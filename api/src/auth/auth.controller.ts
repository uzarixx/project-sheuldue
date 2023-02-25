import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { ValidationPipe } from "../pipes/validation.pipe";
import { LoginUserDto } from "../users/dto/login-user.dto";

@Controller("auth")
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UsePipes(ValidationPipe)
  @Post("/login")
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @UsePipes(ValidationPipe)
  @Post("/registration")
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
