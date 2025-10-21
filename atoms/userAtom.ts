import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';
import { Event } from './eventAtom';

export type User = {
    id: string;
    email: string;
    username: string;
    name: string;
    password: string;
    events: Event[];
}

export const usersAtom = atomWithStorage<User[]>('users', [], {
  getItem: async (key) => {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  },
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key);
  },
});
   

export const currentUserAtom = atom<User | null>(null);