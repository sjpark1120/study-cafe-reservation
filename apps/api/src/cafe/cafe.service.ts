import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService, SaveCafeImageResult } from '../upload/upload.service';
import { CafeListItemResponse, CreateCafeDto } from './dto/cafe.dto';
import {
  buildPaginatedResponse,
  getSkipTake,
} from '../common/utils/pagination.util';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { PaginatedResponse } from '../common/types/pagination.types';

@Injectable()
export class CafeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async getCafes(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponse<CafeListItemResponse>> {
    const { page, limit } = query;
    const { skip, take } = getSkipTake(page, limit);

    const [totalCount, cafes] = await Promise.all([
      this.prisma.cafe.count(),
      this.prisma.cafe.findMany({
        skip,
        take,
        include: {
          image: true,
          price: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const rows: CafeListItemResponse[] = cafes.map((cafe) => ({
      id: Number(cafe.id),
      businessName: cafe.businessName,
      roadAddress: cafe.roadAddress,
      detailAddress: cafe.detailAddress,
      hashTags: cafe.hashTags,
      imageUrl: cafe.image?.imageUrl ?? null,
      priceValue: cafe.price ? Number(cafe.price.value) : null,
    }));

    return buildPaginatedResponse({
      rows,
      totalCount,
      page,
      limit,
    });
  }

  async getCafeById(cafeId: number): Promise<CafeListItemResponse> {
    const numericId = BigInt(cafeId);

    const cafe = await this.prisma.cafe.findUnique({
      where: { id: numericId },
      include: {
        image: true,
        price: true,
      },
    });

    if (!cafe) throw new NotFoundException('Cafe not found');

    return {
      id: Number(cafe.id),
      businessName: cafe.businessName,
      roadAddress: cafe.roadAddress,
      detailAddress: cafe.detailAddress,
      hashTags: cafe.hashTags,
      imageUrl: cafe.image?.imageUrl ?? null,
      priceValue: cafe.price ? Number(cafe.price.value) : null,
    };
  }

  async createCafe(
    dto: CreateCafeDto,
    file?: Express.Multer.File,
  ): Promise<CafeListItemResponse> {
    let saved: SaveCafeImageResult | null = null;
    if (file?.buffer?.length) {
      saved = await this.uploadService.saveCafeImage(file);
    }

    try {
      const created = await this.prisma.$transaction(async (tx) => {
        const cafe = await tx.cafe.create({
          data: {
            businessName: dto.businessName,
            roadAddress: dto.roadAddress,
            detailAddress: dto.detailAddress,
            hashTags: dto.hashTags ?? [],
          },
          include: { price: true },
        });

        let image: { imageUrl: string } | null = null;
        if (saved) {
          image = await tx.cafeImage.create({
            data: {
              cafeId: cafe.id,
              imageUrl: saved.imageUrl,
              originalName: saved.originalName,
              identifiedName: saved.identifiedName,
              extension: saved.extension,
            },
          });
        }

        let price: { value: bigint } | null = null;
        if (dto.priceValue != null) {
          price = await tx.price.create({
            data: {
              cafeId: cafe.id,
              value: BigInt(dto.priceValue),
            },
          });
        }

        return { ...cafe, image, price };
      });

      return {
        id: Number(created.id),
        businessName: created.businessName,
        roadAddress: created.roadAddress,
        detailAddress: created.detailAddress,
        hashTags: created.hashTags,
        imageUrl: created.image?.imageUrl ?? null,
        priceValue: created.price ? Number(created.price.value) : null,
      };
    } catch (err) {
      if (saved) {
        await this.uploadService.deleteCafeImageFile(saved.imageUrl);
      }
      throw err;
    }
  }
}
