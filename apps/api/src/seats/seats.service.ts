import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SeatItemResponse } from './dto/seat.dto';
import { Seat } from '../../generated/prisma/client';

@Injectable()
export class SeatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSeats(cafeId: number): Promise<SeatItemResponse[]> {
    const cafeIdBigInt = BigInt(cafeId);

    const seats: Seat[] = await this.prisma.seat.findMany({
      where: { cafeId: cafeIdBigInt },
      orderBy: { seatNumber: 'asc' },
    });

    return seats.map((seat) => ({
      id: Number(seat.id),
      seatName: seat.seatName,
      seatNumber: seat.seatNumber,
      seatType: seat.seatType,
      status: seat.status as 'IDLE' | 'LOCKED' | 'USING',
      location: seat.location,
    }));
  }

  async updateSeatStatus(
    cafeId: number,
    seatId: number,
    status: 'IDLE' | 'USING',
  ): Promise<void> {
    const cafeIdBigInt = BigInt(cafeId);
    const seatIdBigInt = BigInt(seatId);

    const seat = await this.prisma.seat.findFirst({
      where: {
        id: seatIdBigInt,
        cafeId: cafeIdBigInt,
      },
    });

    if (!seat) throw new NotFoundException('Seat not found');

    await this.prisma.seat.update({
      where: { id: seat.id },
      data: { status },
    });
  }
}
