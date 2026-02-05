import { Controller, Get, Request } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { AccountService } from './account.service';

interface JwtRequest extends ExpressRequest {
  user: {
    sub: number;
  };
}

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('me')
  async getMe(@Request() req: JwtRequest) {
    const accountId = req.user.sub;
    return this.accountService.getMe(accountId);
  }
}
