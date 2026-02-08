import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterResponseDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

interface AuthAccountPayload {
  email: string;
  id: bigint;
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

  login(account: AuthAccountPayload) {
    const payload = { email: account.email, sub: Number(account.id) };

    return {
      accessToken: this.jwtService.sign(payload, {
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

    const newAccount = await this.prisma.account.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        displayName: name,
        status: 'ACTIVE',
        role: 'USER',
      },
    });

    return {
      account_id: Number(newAccount.id),
      email: newAccount.email,
      name: newAccount.name,
      displayName: newAccount.displayName,
      role: newAccount.role,
      status: newAccount.status,
      createdAt: new Date(newAccount.createdAt).getTime(),
    };
  }
}
