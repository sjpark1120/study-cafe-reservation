import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterResponseDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Account } from '../../generated/prisma/client';

interface AuthAccountPayload {
  email: string;
  account_id: bigint;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount(email: string, password: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        email: email,
      },
    });

    if (account && (await bcrypt.compare(password, account.password))) {
      const { password, ...result } = account;
      return result;
    }

    return null;
  }

  async login(account: AuthAccountPayload) {
    const payload = { email: account.email, sub: Number(account.account_id) };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async register(
    email: string,
    password: string,
    name: string,
  ): Promise<RegisterResponseDto> {
    const existingAccount = await this.prisma.account.findUnique({
      where: {
        email: email,
      },
    });

    if (existingAccount) {
      throw new BadRequestException('Account already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const now = Date.now();

    const newAccount = await this.prisma.account.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        display_name: name,
        status: 'ACTIVE',
        created_at: now,
        updated_at: now,
        role: 'USER',
      },
    });

    return {
      account_id: Number(newAccount.account_id),
      email: newAccount.email,
      name: newAccount.name,
      display_name: newAccount.display_name,
      role: newAccount.role,
      status: newAccount.status,
      created_at: Number(newAccount.created_at),
    };
  }
}
