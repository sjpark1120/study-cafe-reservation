import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

interface ResponseDto<T> {
  success: boolean;
  data: T;
  message: string | null;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ResponseDto<T>
> {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        data,
        message: null,
      })),
    );
  }
}
