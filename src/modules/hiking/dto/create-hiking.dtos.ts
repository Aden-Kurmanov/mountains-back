export interface CreateHikingDto {
  id: number;
  name: string;
  description: string;
  levelId: number;
  typeId: number;
  guideId: number;
  startDate: string;
  endDate: string;
  images: Express.Multer.File[];
  price: number;
  currencyId: number;
}
