import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { usersAtom } from "../atoms/userAtom";

export default function Index() {
  const router = useRouter();
  const [user] = useAtom(usersAtom);
  
  useEffect(() => {
    if (user) {
      router.replace("/auth");
    } else {
      router.replace("/login");
    }
  }, [user]);

  return (
    <View className="flex-1 items-center justify-center bg-yellow-200">
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}