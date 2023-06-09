import { DATE_FORMAT, FIRST_WEEK_DAY, LAST_WEEK_DAY, MAX_COUNT_OFFER_GUESTS, MAX_COUNT_OFFER_ROOMS, MAX_OFFER_PRICE, MAX_OFFER_RATING, MIN_COUNT_OFFER_GUESTS, MIN_COUNT_OFFER_ROOMS, MIN_OFFER_PRICE, MIN_OFFER_RATING } from '../../const.js';
import { generateRandomValue, getRandomBoolean, getRandomCoordinates, getRandomItem, getRandomItems } from '../../core/helpers/index.js';
import { MockData } from '../../types/mock-data.type.js';
import { OfferType } from '../../types/offer-type.type.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import dayjs from 'dayjs';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publishDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').format(DATE_FORMAT);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const photos = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = generateRandomValue(MIN_OFFER_RATING, MAX_OFFER_RATING, 1).toString();
    const type = getRandomItem<string>([OfferType.Apartment, OfferType.Hotel, OfferType.House, OfferType.Room]);
    const rooms = generateRandomValue(MIN_COUNT_OFFER_ROOMS, MAX_COUNT_OFFER_ROOMS).toString();
    const guests = generateRandomValue(MIN_COUNT_OFFER_GUESTS, MAX_COUNT_OFFER_GUESTS).toString();
    const price = generateRandomValue(MIN_OFFER_PRICE, MAX_OFFER_PRICE).toString();
    const goods = getRandomItems<string>(this.mockData.amenities).join(';');
    const advertiser = getRandomItem(this.mockData.advertiser);
    const coordinates = getRandomCoordinates();

    return [
      title,
      description,
      publishDate,
      city,
      coordinates.longitude,
      coordinates.latitude,
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
      advertiser.username,
      advertiser.email,
      advertiser.avatarPath,
      advertiser.status,
    ].join('\t');
  }
}
