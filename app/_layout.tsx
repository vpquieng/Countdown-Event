import React, { useEffect } from "react";
import { Provider, useAtom } from "jotai";
import { Stack, useRouter, useSegments } from "expo-router";
import { currentUserAtom } from "../atoms/userAtom";
import "./global.css"

function RootNavigation() {
  const router = useRouter();
  const [currentUser] = useAtom(currentUserAtom);
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";

    // ✅ If logged in and NOT in /auth, go to /auth
    if (currentUser?.token && !inAuthGroup) {
      router.replace("/auth"); 
    }

    // ✅ If NOT logged in and trying to access /auth, send to login
    if (!currentUser?.token && inAuthGroup) {
      router.replace("/login");
    }
  }, [segments, currentUser]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
      <Stack.Screen name="login" options={{ title: "Sign in" }} />
      <Stack.Screen name="register" options={{ title: "Sign up" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider>
      <RootNavigation />
    </Provider>
  );
}
