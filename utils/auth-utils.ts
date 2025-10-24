import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { User } from "../atoms/userAtom";

// Extended User type to include authentication token
export type AuthUser = User & { token: string };

// Generate a session token
export const generateAuthToken = () => uuid.v4().toString();

// Save user session
export const saveSession = async (user: AuthUser) => {
  await AsyncStorage.setItem("currentUser", JSON.stringify(user));
};

// Clear current session
export const clearSession = async () => {
  await AsyncStorage.removeItem("currentUser");
};

// Login user
export const loginUser = async (user: User): Promise<AuthUser> => {
  const loggedInUser: AuthUser = {
    ...user,
    token: generateAuthToken(),
  };
  await saveSession(loggedInUser);
  return loggedInUser;
};

// Logout user
export const logoutUser = async () => {
  await clearSession();
  return null;
};