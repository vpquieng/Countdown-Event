import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage } from 'jotai/utils';

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  status: string;
  description?: string;
  hasNotified?: boolean;
};

export const eventListAtom = atomWithStorage<Event[]>('events', [], {
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
