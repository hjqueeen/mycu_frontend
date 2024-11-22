import { UserEntity, UserRole } from '../../modules/user/models/user.types';
import { Account, Profile } from './all.types';

export interface LoginData {
  email: string;
  password: string;
}

export interface Payload {
  id: string;
  accessToken: string;
  email: string;
  roles: UserRole[];
}

export interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface TokenPayload {
  id: string;
  status: string;
  roles: string[];
  email: string;
  date: Date;
  community?: string;
}

export interface LoginResponse {
  accessToken: string;
  user: Account;
}
