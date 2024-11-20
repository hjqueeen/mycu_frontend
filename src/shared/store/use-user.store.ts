import dayjs from 'dayjs';
import { create } from 'zustand';
import 'dayjs/locale/de';
import 'dayjs/locale/en';

export interface UserState {}

export const useUserStore = create<UserState>((set, get) => ({}));
