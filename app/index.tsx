import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { currentUserAtom } from "../atoms/userAtom";

export default function Index() {
  const router = useRouter();
  const [currentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    // Wait a tick to ensure RootLayout has mounted
    const timer = setTimeout(() => {
      if (currentUser) {
        router.replace("/auth"); // go to AuthLayout
      } else {
        router.replace("/login"); // go to public login screen
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [currentUser]);

  return (
    <View className="flex-1 items-center justify-center bg-yellow-200">
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}
