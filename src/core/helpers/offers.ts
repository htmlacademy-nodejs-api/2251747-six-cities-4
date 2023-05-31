import { City } from '../../types/city.type.js';
import { RentOffer } from '../../types/rent-offer.type';

export function createOffer(offerData: string): RentOffer {
  const [
    title,
    description,
    offerDate,
    city,
    longitude,
    latitude,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    username,
    email,
    avatarPath,
    password,
    status,

  ] = offerData.replace('\n', '').split('\t');

  const advertiser = {
    username,
    email,
    avatarPath,
    password,
    status: status as 'pro' | 'обычный',
  };

  const location = {
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  };

  return {
    title,
    description,
    offerDate:  new Date(offerDate).toISOString(),
    city: City[city as keyof typeof City],
    previewImage,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: parseFloat(rating),
    type,
    bedrooms: parseInt(bedrooms, 10),
    maxAdults: parseInt(maxAdults, 10),
    price: parseFloat(price),
    goods: goods.split(';'),
    location,
    advertiser,
  } as RentOffer;

}
