import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerData: { email: string; password: string; name: string },
  ) {
    const { email, password, name } = registerData;
    return this.authService.register(email, password, name);
  }
}
