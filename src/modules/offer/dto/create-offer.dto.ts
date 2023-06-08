export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public publishDate!: Date;
  public city!: string;
  public previewImage!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public type!: string;
  public rooms!: number;
  public guests!: number;
  public price!: number;
  public goods!: string[];
  public userId!: string;
  public location!: {
    latitude: number,
    longitude: number
  };
}
