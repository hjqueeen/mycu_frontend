import { UserRole } from '../../modules/user/models/user.types';

export enum InspectionViewType {
  Country = 'country',
  Inspections = 'inspections',
  Products = 'products',
}

export enum InspectionContentType {
  Add = 'ADD',
  All = 'ALL',
  Default = 'HOME',
  Edit = 'EDIT',
  Template = 'TEMPLATE',
  CountryView = 'country_view',
  InspectionsView = 'inspections_view',
  ProductsView = 'products_view',
}

export enum ShippingContentType {
  Add = 'ADD',
  // All = 'ALL',
  // Default = 'HOME',
  Edit = 'EDIT',
  // Template = 'TEMPLATE',
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
  notification: boolean;
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
  shipping_area?: AreaType; // 출고지
  company_name: string; // 업체명
  final_shipping_location?: string; // 최종출고지
  shipping_address?: string; // 최종출고지
}

export enum AreaType {
  Domestic = '국내',
  International = '해외',
}

export interface GetProductDatailsResponse {
  id: string;
  document: string;
  model_number: string;
  model_name: string;

  manufacture_date: Date;
  shipping_history: Shipping[];

  device_udi: string;
  device_lot: string;
  device_serial: string;

  battery_udi: string;
  battery_expiration_date: Date;

  pads_udi: string;
  pads_lot: string;
  pads_expiration_date: Date;
}

export interface GetProductResponse {
  id: string;
  document: string;
  inspector: Account;
  model_number: string;
  area_type: AreaType;
  continental: string;
  country: string;
  company_name: string;
  shipping_history_length: number;

  manufacture_date: Date;
  inspection_date: Date;
  shipping_date: Date;

  device_udi: string;
  device_lot: string;
  device_serial: string;

  battery_udi: string;
  battery_expiration_date: Date;

  pads_udi: string;
  pads_lot: string;
  pads_expiration_date: Date;
}
export interface Shipping {
  id: string;
  product: GetProductResponse;
  company: ICompany; // 업체정보
  shipping_date: Date; // 출고일자
  shipping_type: string; // 출고구분
  delivery_address: string; // 배송지
  remarks: string; // 비고
}
