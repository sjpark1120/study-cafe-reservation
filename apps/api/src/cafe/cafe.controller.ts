import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CafeService } from './cafe.service';
import { CreateCafeDto, CafeListItemResponse } from './dto/cafe.dto';
import { Public } from '../auth/decorator/public.decorator';
import { MAX_FILE_SIZE_BYTES } from '../upload/upload.service';

@Controller('cafes')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Public()
  @Get()
  async findAllCafes(): Promise<CafeListItemResponse[]> {
    return this.cafeService.getCafes();
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
