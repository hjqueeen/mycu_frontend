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
  Level_0 = 'LEVEL_0',
  Level_1 = 'LEVEL_1',
  Level_2 = 'LEVEL_2',
  Level_3 = 'LEVEL_3',
  Level_4 = 'LEVEL_4',
  Level_5 = 'LEVEL_5',
  // MEMBER = 'MEMBER',
  // ADMIN = 'ADMIN',
  // EMPLOYEE = 'EMPLOYEE'
}
