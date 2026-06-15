import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  status: string;
  description?: string;
  notificationScheduled?: boolean;
};

const storage = createJSONStorage<Event[]>(() => AsyncStorage);

export const eventListAtom = atomWithStorage<Event[]>(
  "events",
  [],
  storage,
  { getOnInit: true }
);