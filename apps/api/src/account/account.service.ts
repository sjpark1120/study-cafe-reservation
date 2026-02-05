import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(accountId: number) {
    const account = await this.prisma.account.findUnique({
      where: {
        account_id: BigInt(accountId),
      },
      select: {
        account_id: true,
        email: true,
        name: true,
        display_name: true,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return {
      account_id: Number(account.account_id),
      email: account.email,
      name: account.name,
      display_name: account.display_name,
    };
  }
}
