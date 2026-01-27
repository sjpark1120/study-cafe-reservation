import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { Account } from '../../generated/prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Request & { user: Account }) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() registerData: { email: string; password: string; name: string },
  ) {
    const { email, password, name } = registerData;
    return this.authService.register(email, password, name);
  }
}
