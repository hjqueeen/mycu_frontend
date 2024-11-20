import { UserEntity, UserRole } from '../../modules/user/models/user.types';

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

export interface RegistrationData {
  code?: string;
  disclaimer: boolean;
  email: string;
  leaflet?: boolean;
  termsOfService: boolean;
  token?: string;
  toolPreviewId?: string;
  linkId?: string;
  communityLink?: string;
  accessToken?: string;
  toolId?: string;
  groupinvite?: string;
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
  user: UserEntity;
}
