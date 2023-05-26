import { City } from './city.type.js';
import { Goods } from './goods.type';
import { Location } from './location.type';
import { OfferType } from './offer-type.type';
import { User } from './user.type';

export type RentOffer = {
  title: string,
  description: string,
  offerDate: string,
  city: City,
  previewImage: string,
  images: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  type: OfferType,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: Goods[],
  advertiser: User,
  location: Location,
}
