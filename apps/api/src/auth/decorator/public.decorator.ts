import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * JWT 가드를 건너뛸 공개 엔드포인트에 적용
 */
export function Public() {
  return SetMetadata(IS_PUBLIC_KEY, true);
}
