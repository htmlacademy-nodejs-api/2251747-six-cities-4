import { City } from '../../types/city.type.js';
import { RentOffer } from '../../types/rent-offer.type';

export function createOffer(offerData: string): RentOffer {
  const [
    title,
    description,
    publishDate,
    city,
    longitude,
    latitude,
    previewImage,
    photos,
    isPremium,
    isFavorite,
    rating,
    type,
    rooms,
    guests,
    price,
    goods,
    username,
    email,
    avatarPath,
    status,
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    username,
    email,
    avatarPath,
    status: status as 'pro' | 'base',
  };

  const location = {
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  };

  return {
    title,
    description,
    publishDate:  new Date(publishDate).toISOString(),
    city: City[city as keyof typeof City],
    previewImage,
    photos: photos.split(';'),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: parseFloat(rating),
    type,
    rooms: parseInt(rooms, 10),
    guests: parseInt(guests, 10),
    price: parseFloat(price),
    goods: goods.split(';'),
    location,
    user,
  } as RentOffer;

}
