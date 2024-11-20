import { TFunctionResult } from 'i18next';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

// Models
import { ReactNode } from 'react';
import { UserEntity } from '../../modules/user/models/user.types';

export enum PagePath {
  Contacts = 'CONTACTS',
  Workbench = 'WORKBENCH',
  Market = 'MARKET',
  Newscenter = 'NEWSCENTER',
}

export enum AlertAction {
  Close = 'CLOSE',
  Submit = 'SUBMIT',
}

export enum CrudState {
  Create = 'CREATE',
  CreateNoMember = 'CREATE_NO_MEMBER',
  Delete = 'DELETE',
  Read = 'READ',
  Update = 'UPDATE',
  UpdateNoMember = 'UPDATE_NO_MEMBER',
}

export enum FilterType {
  Date = 'DATE',
  Name = 'NAME',
}

export enum ImageFallbackType {
  Community = 'COMMUNITY',
  Profile = 'PROFILE',
  Network = 'NEWWORK',
  Group = 'GROUP',
  Tool = 'TOOL',
  ToolUpload = 'TOOLUPLOAD',

  // for ToolUserType
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  Member = 'MEMBER',
  Folder = 'FOLDER',
  GroupWithMessage = 'GROUP_WITH_MESSAGE',
  GroupWithoutMessage = 'GROUP_WITHOUT_MESSAGE',
}

export enum OnlineState {
  Away = 'AWAY',
  Offline = 'OFFLINE',
  Online = 'ONLINE',
}

export enum Orientation {
  Center = 'CENTER',
  End = 'END',
  Start = 'START',
}

export enum ResultState {
  Error = 'ERROR',
  Info = 'INFO',
  Success = 'SUCCESS',
  Warning = 'WARNING',
}

export enum Role {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  Member = 'MEMBER',
  Guest = 'GUEST',
}

export enum SortDirection {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING',
  None = 'NONE',
}

// MUI expects normal-case not uppercase
export enum Theme {
  Dark = 'Dark',
  Light = 'Light',
}

export interface Address {
  country?: string;
  house_number?: string;
  place?: string;
  street?: string;
  zip_code?: string;
}

export interface Alert {
  subtitle?: string | TFunctionResult | ReactNode;
  title: string | TFunctionResult;
}

export interface Attachment {
  id: string;
  url: string;
}

export interface AttachmentFile extends Attachment {
  name: string;
  type: string;
}

export interface Avatar {
  id: string;
  date: string;
  filename: string;
  path: string;
}

export interface BreadcrumbPath {
  title: string | TFunctionResult;
  location?: string;
}

export interface CreateChangeInfo {
  changed_at: string;
  created_at: string;
  created_by: Partial<UserEntity>;
  changed_by?: Partial<UserEntity>;
}
export interface FilePreview {
  icon?: [IconPrefix, IconName];
  image?: string;
  name: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  exp: number;
  iat: number;
  roles: string[];
}

export interface MenuItem {
  action: any;
  disabled?: boolean;
  title: string | TFunctionResult;
  tooltip?: string | TFunctionResult;
  tooltip_placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  icon?: [IconPrefix, IconName];
}

export interface PopoverItem {
  id: string;
  image?: Attachment;
  name: string;
}

export interface Notification extends Alert {
  state?: ResultState;
  timeout?: number;
}

export interface Notifications {
  send_email: boolean;
  send_sms: boolean;
}

export interface PasswordChange {
  passwordNew: string;
  passwordNewConfirm: string;
  [key: string]: string;
}

export interface Option {
  color?: string;
  placeholder: string;
  value: OptionValueType;
  listHeader?: boolean;
  name?: string;
}

export interface OptionVote {
  type: OptionVoteType;
  values: number;
}

export enum OptionVoteType {
  Star = 'STAR',
  Grade = 'GRADE',
  Count = 'COUNT',
}

export interface SocketEventSubscriptionResponse {
  data?: { [key: string]: any };
  error?: any;
  status: ResultState;
}

export interface RemoveRoomUsersSocketResponse {
  data?: { room_id: string; user_name: string };
  error?: any;
  status: ResultState;
}


export interface TanData {
  tan: boolean;
}

export interface SecurityWordData {
  word: string;
}

export type OptionValueType = number | string | undefined | [];

export interface NicknameChange {
  nickname: string;
}

export interface NicknameChangeRequest {
  id: string;
  data: NicknameChange;
}

export interface MetaTags {
  title: string;
  description: string;
  keywords: string;
  imgsrc: string;
  url: string;
}

export interface SelectGroup {
  title: string | TFunctionResult;
  options: Option[];
}

export interface UserCard {
  name: string;
  avatar: string;
}

export interface CustomCardProps {
  title: string;
  description: string;
  user: UserCard;
  autoid: string;
}

export const thinScroll = {
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
};
