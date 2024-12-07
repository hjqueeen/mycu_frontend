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

export interface JwtPayload {
  id: string;
  email: string;
  exp: number;
  iat: number;
  role: string;
}

export interface PasswordChange {
  passwordNew: string;
  passwordNewConfirm: string;
  [key: string]: string;
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
