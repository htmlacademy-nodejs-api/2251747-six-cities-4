import { accessSync, constants, readFileSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface';
import { RentOffer } from '../../types/rent-offer.type';
import { Location } from '../../types/location.type';
import { User } from '../../types/user.type';
import { UserType } from '../../types/user-type.type';
import { City } from '../../types/city.type';
import { OfferType } from '../../types/offer-type.type';
import { Goods } from '../../types/goods.type';

export default class TSVFileReader implements FileReaderInterface {
  private rawData: string | undefined;

  constructor(public filename: string) { }

  public read(): void {
    try {
      accessSync(this.filename, constants.R_OK);
      this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
    } catch (err) {
      console.error(err);
    }
  }

  public toArray(): RentOffer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map((offer) => {
        const [city, previewImage, images, title, offerDate, isPremium, isFavorite, rating, type, bedrooms, maxAdults, price, goods, name, email, userStatus, avatarImage, description, latitude, longitude
        ] = offer;

        const offerImages: string[] = images.split(';');

        const offerGoods = goods.split(';') as Goods[];

        const location: Location = {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude),
        };

        const advertiser: User = {
          username: name,
          email,
          avatarPath: avatarImage,
          status: userStatus as UserType
        };

        return {
          title,
          description,
          offerDate,
          city: city as City,
          previewImage,
          images: offerImages,
          isPremium: isPremium === 'true',
          isFavorite: isFavorite === 'true',
          rating: Number.parseFloat(rating),
          type: type as OfferType,
          bedrooms: Number.parseInt(bedrooms, 10),
          maxAdults: Number.parseInt(maxAdults, 10),
          price: Number.parseInt(price, 10),
          goods: offerGoods,
          advertiser,
          location
        };
      });
  }
}
