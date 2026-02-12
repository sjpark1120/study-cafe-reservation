import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CafeListItemResponse } from './dto/cafe.dto';

@Injectable()
export class CafeService {
  constructor(private readonly prisma: PrismaService) {}

  async getCafeList(): Promise<CafeListItemResponse[]> {
    const cafes = await this.prisma.cafe.findMany({
      include: {
        image: true,
        price: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    if (!cafes.length) return [];

    return cafes.map((cafe) => ({
      id: Number(cafe.id),
      businessNumber: cafe.businessNumber,
      roadAddress: cafe.roadAddress,
      detailAddress: cafe.detailAddress,
      hashTags: cafe.hashTags,
      imageUrl: cafe.image?.imageUrl ?? null,
      priceValue: cafe.price ? Number(cafe.price.value) : null,
    }));
  }
}
