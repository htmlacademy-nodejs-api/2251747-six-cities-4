import { UserType } from './user-type.type';

export type User = {
  username: string;
  email: string;
  avatarPath: string;
  status: UserType
}
