import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatItemResponse, UpdateSeatStatusDto } from './dto/seat.dto';
import { Public } from '../auth/decorator/public.decorator';

@Controller('cafes/:cafeId/seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Public()
  @Get()
  async getSeats(
    @Param('cafeId', ParseIntPipe) cafeId: number,
  ): Promise<SeatItemResponse[]> {
    return this.seatsService.getSeats(cafeId);
  }

  @Patch(':seatId/status')
  async updateSeatStatus(
    @Param('cafeId', ParseIntPipe) cafeId: number,
    @Param('seatId', ParseIntPipe) seatId: number,
    @Body() body: UpdateSeatStatusDto,
  ): Promise<void> {
    await this.seatsService.updateSeatStatus(cafeId, seatId, body.status);
  }
}
