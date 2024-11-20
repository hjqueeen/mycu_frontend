import { Avatar } from '../../../shared/models/shared.types';

export interface PersonalData {
  birthday?: string;
  first_name?: string;
  last_name?: string;
  telephone?: string;
}

// Same as Backend user entity
export interface UserEntity {
  id: string;
  avatar_id: Avatar;
  // notifications_id: Notifications;
  // theme: Theme;
  email: string;
  password: string;
  salt: string;
  roles: UserRole[];
  language: string;
  first_name: string;
  last_name: string;
  birthday: string;
  street: string;
  house_number: string;
  zip_code: string;
  place: string;
  country: string;
  phone: string;
  telephone: string;
  last_logout: Date;
  last_login: Date;
  previous_login: Date;
  register_date: Date;
}

export enum UserRole {
  First = 'FIRST', // low
  Second = 'Second',
  Third = 'THIRD',
  Forth = 'FORTH',
  Fifth = 'FIFTH',
}
