import { UserEntity, UserRole } from '../../modules/user/models/user.types';
import { Account } from './all.types';

export interface AccountSetupRequest {
  token: string;
  values: {
    email: string;
    first_name?: string;
    last_name?: string;
    password: string;
  };
}

export interface AccountUsers {
  employees: string;
  members: string;
}

export interface ShowName {
  show_name_formular_at_registration: boolean;
}

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

export interface SignInData {
  first_name: string;
  last_name: string;
  email: string;
  accessToken?: string;
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
