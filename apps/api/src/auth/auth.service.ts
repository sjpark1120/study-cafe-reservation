import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterResponseDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
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
