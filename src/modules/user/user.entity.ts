import { DEFAULT_AVATAR_URL, MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from '../../const.js';
import { createSHA256 } from '../../core/helpers/common.js';
import { UserType } from '../../types/user-type.type.js';
import { User } from '../../types/user.type.js';
import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User{
  @prop({
    required: true,
    minlength: [MIN_USERNAME_LENGTH, `Min length for username is ${ MIN_USERNAME_LENGTH}`],
    maxlength: [MAX_USERNAME_LENGTH, `Max length for username is ${ MAX_USERNAME_LENGTH}`]
  })
  public username: string;

  @prop({
    required: true,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  })
  public email: string;

  @prop({
    default: DEFAULT_AVATAR_URL
  })
  public avatarPath: string;

  @prop({
    required: true,
  })
  private password?: string;

  @prop({
    type: () => String,
    enum: UserType,
    required: true
  })
  public status: UserType;

  constructor(userData: User) {
    super();

    this.username = userData.username;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath || DEFAULT_AVATAR_URL;
    this.status = userData.status;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
