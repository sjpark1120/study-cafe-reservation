import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CafeService } from './cafe.service';
import { CreateCafeDto, CafeListItemResponse } from './dto/cafe.dto';
import { Public } from '../auth/decorator/public.decorator';
import { MAX_FILE_SIZE_BYTES } from '../upload/upload.service';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { PaginatedResponse } from '../common/types/pagination.types';

@Controller('cafes')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Public()
  @Get()
  async findAllCafes(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResponse<CafeListItemResponse>> {
    return this.cafeService.getCafes(query);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: MAX_FILE_SIZE_BYTES },
    }),
  )
  async createCafe(
    @Body() dto: CreateCafeDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<CafeListItemResponse> {
    return this.cafeService.createCafe(dto, file);
  }

  @Public()
  @Get(':id')
  async findCafeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CafeListItemResponse> {
    return this.cafeService.getCafeById(id);
  }
}
