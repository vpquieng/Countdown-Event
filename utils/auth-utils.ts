import uuid from "react-native-uuid";
import { User } from "../atoms/userAtom";

export async function loginUser(user: User): Promise<User> {
  return {
    ...user,
    token: uuid.v4().toString(),
  };
}