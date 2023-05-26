export type MockData = {
  titles: string[];
  descriptions: string[];
  cities: string[];
  previewImages: string[];
  images: string[];
  isPremium: string;
  isFavorite: string;
  rating: string;
  rooms: string;
  guests: string;
  types: string[];
  amenities: string[];
  advertiser: {
    username: string[];
    email: string[];
    avatarPath: string[];
    status: string[];
  }[];
  password: string[];
  userType: string[];
  coordinates: {
    latitude: string;
    longitude: string;
  }
};
