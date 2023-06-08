import { UserType } from '../../../types/user-type.type.js';

export default class CreateUserDto {
  public username!: string;
  public email!: string;
  public avatarPath!: string;
  public password!: string;
  public status!: UserType;
}
