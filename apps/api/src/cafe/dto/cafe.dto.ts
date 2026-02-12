export interface CafeListItemResponse {
  id: number;
  businessNumber: string;
  roadAddress: string;
  detailAddress: string;
  hashTags: string[];
  imageUrl: string | null;
  priceValue: number | null;
}
