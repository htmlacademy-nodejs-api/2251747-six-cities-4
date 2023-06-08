import { City } from './city.type.js';
import { Goods } from './goods.type';
import { Location } from './location.type';
import { OfferType } from './offer-type.type';
import { User } from './user.type';

export type RentOffer = {
  title: string,
  description: string,
  publishDate: string,
  city: City,
  previewImage: string,
  photos: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  type: OfferType,
  rooms: number,
  guests: number,
  price: number,
  goods: Goods[],
  user: User,
  location: Location,
}
