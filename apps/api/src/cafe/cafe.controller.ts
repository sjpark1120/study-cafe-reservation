import { Controller, Get } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeListItemResponse } from './dto/cafe.dto';
import { Public } from '../auth/decorator/public.decorator';

@Controller('cafes')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Public()
  @Get()
  async getCafeList(): Promise<CafeListItemResponse[]> {
    return this.cafeService.getCafeList();
  }
}
