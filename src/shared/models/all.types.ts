import { UserRole } from '../../modules/user/models/user.types';

export enum ProductsContentType {
  Add = 'ADD',
  All = 'ALL',
  Default = 'HOME',
  Edit = 'EDIT',
}

export interface Account {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

export interface Profile {
  first_name: string;
  last_name: string;
  role: UserRole;
}

export interface FetchDataParams {
  group_id?: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  register_date: Date;
}
