import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeListItemResponse } from './dto/cafe.dto';
import { Public } from '../auth/decorator/public.decorator';

@Controller('cafes')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Public()
  @Get()
  async findAllCafes(): Promise<CafeListItemResponse[]> {
    return this.cafeService.getCafes();
  }

  @Public()
  @Get(':id')
  async findCafeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CafeListItemResponse> {
    return this.cafeService.getCafeById(id);
  }
}
