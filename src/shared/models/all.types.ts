import { UserRole } from '../../modules/user/models/user.types';

export enum InspectionContentType {
  Add = 'ADD',
  All = 'ALL',
  Default = 'HOME',
  Edit = 'EDIT',
  Template = 'TEMPLATE',
}

export interface Account {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  street?: string;
  house_number?: string;
  address_detail?: string;
  zip_code?: string;
  place?: string;
  country?: string;
  telephone?: string;
}

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  group?: string;
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

export interface UserGroup {
  id: string;
  name: string;
  contact_person?: User;
  users: User[];
  dashboard: boolean;
  products: boolean;
  inventory: boolean;
  shipping: boolean;
  user_management: boolean;
}

export type ExtendedTreeItemProps = {
  id: string;
  label: string;
};

export interface HeaderMenu {
  dashboard: boolean;
  products: boolean;
  inventory: boolean;
  shipping: boolean;
  user_management: boolean;
}

export enum State {
  Error = 'ERROR',
  Success = 'SUCCESS',
}

export interface ResponseStandard {
  status: State;
  [key: string]: any;
}

export interface ICategory {
  id: string;
  model_number: string;
}

export interface ICompany {
  id: string;
  shipping_area?: ShippingArea; // 출고지
  company_name: string; // 업체명
  final_shipping_location?: string; // 최종출고지
  shipping_address?: string; // 최종출고지
}

export enum ShippingArea {
  Domestic = '국내',
  International = '해외',
}
