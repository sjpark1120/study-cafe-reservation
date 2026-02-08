import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(accountId: number) {
    const account = await this.prisma.account.findUnique({
      where: {
        id: BigInt(accountId),
      },
      select: {
        id: true,
        email: true,
        name: true,
        displayName: true,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return {
      accountId: Number(account.id),
      email: account.email,
      name: account.name,
      displayName: account.displayName,
    };
  }
}
