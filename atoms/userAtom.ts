import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { Event } from "./eventAtom";

export type User = {
  id: string;
  email: string;
  username: string;
  name: string;
  password: string;
  events: Event[];
  token?: string;
};

const usersStorage = createJSONStorage<User[]>(() => AsyncStorage);
const currentUserStorage = createJSONStorage<User | null>(() => AsyncStorage);

export const usersAtom = atomWithStorage<User[]>(
  "users",
  [],
  usersStorage,
  { getOnInit: true }
);

export const currentUserAtom = atomWithStorage<User | null>(
  "currentUser",
  null,
  currentUserStorage,
  { getOnInit: true }
);