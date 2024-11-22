import { UserRole } from '../../modules/user/models/user.types';

export enum ProductsContentType {
  Add = 'ADD',
  All = 'ALL',
  Default = 'HOME',
  Edit = 'EDIT',
}

export interface Account {
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}
