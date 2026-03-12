import { IsIn } from 'class-validator';

export interface SeatItemResponse {
  id: number;
  seatName: string;
  seatNumber: number;
  seatType: string;
  status: 'IDLE' | 'LOCKED' | 'USING';
  location: string;
}

export class UpdateSeatStatusDto {
  @IsIn(['IDLE', 'USING'])
  status: 'IDLE' | 'USING';
}
