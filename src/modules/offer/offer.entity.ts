
import typegoose, { getModelForClass, defaultClasses, Ref } from '@typegoose/typegoose';
import { MAX_OFFER_DESCRIPTION_LENGTH, MAX_OFFER_TITLE_LENGTH, MIN_OFFER_DESCRIPTION_LENGTH, MIN_OFFER_TITLE_LENGTH, OFFER_PHOTOS_AMOUNT } from '../../const.js';
import { Location } from '../../types/location.type.js';
import { City } from '../../types/city.type.js';
import { OfferType } from '../../types/offer-type.type.js';
import { Goods } from '../../types/goods.type.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

class LocationEntity implements Location {
   @prop({
     required: true
   })
     latitude!: number;

   @prop({
     required: true
   })
     longitude!: number;
}


export interface OfferEntity extends defaultClasses.Base {}

 @modelOptions({
   schemaOptions: {
     collection: 'offers'
   }
 })
export class OfferEntity extends defaultClasses.TimeStamps {
   @prop({
     required: true,
     trim: true,
     minlength: [MIN_OFFER_TITLE_LENGTH, `Min length for title is ${ MIN_OFFER_TITLE_LENGTH}`],
     maxlength: [MAX_OFFER_TITLE_LENGTH, `Max length for title is ${ MAX_OFFER_TITLE_LENGTH}`]
   })
  public title!: string;

   @prop({
     required: true,
     trim: true,
     minlength: [MIN_OFFER_DESCRIPTION_LENGTH, `Min length for description is ${ MIN_OFFER_DESCRIPTION_LENGTH}`],
     maxlength: [MAX_OFFER_DESCRIPTION_LENGTH, `Max length for description is ${ MAX_OFFER_DESCRIPTION_LENGTH}`]
   })
   public description!: string;

   @prop({
     required: true
   })
   public publishDate!: Date;

   @prop({
     required: true,
     enum: City,
   })
   public city!: City;

   @prop({
     required: true
   })
   public previewImage!: string;

   @prop({
     type: [String],
     required: true,
     validate: {
       validator: (photos: Array<string>) => photos.length === OFFER_PHOTOS_AMOUNT,
       message: `photos quantity must be equal ${OFFER_PHOTOS_AMOUNT}!`
     }
   })
   public photos!: string[];

   @prop({
     required: true
   })
   public isPremium!: boolean;

   @prop({
     required: true
   })
   public isFavorite!: boolean;

   @prop({
     required: true,
   })
   public rating!: number;

   @prop({
     required: true,
     enum: OfferType
   })
   public type!: OfferType;

   @prop({
     required: true,
   })
   public rooms!: number;

   @prop({
     required: true,
   })
   public guests!: number;

   @prop(
     {
       required: true,
     }
   )
   public price!: number;

   @prop({
     type: () => String,
     enum: Goods,
     required: true,
   })
   public goods!: Goods[];

   @prop({
     required: true,
     ref: UserEntity,
   })
   public userId!: Ref<UserEntity>;

   @prop({ default: 0 })
   public commentCount!: number;

   @prop({
     required: true,
   })
   public location!: LocationEntity;
}


export const OfferModel = getModelForClass(OfferEntity);
