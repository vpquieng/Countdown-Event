import React, { useEffect } from "react";
import { Provider, useAtom } from "jotai";
import { Stack, useRouter, useSegments } from "expo-router";
import { currentUserAtom } from "../atoms/userAtom";
import { debugAsyncStorage } from "../utils/debug-storage";
// TypeScript may complain about side-effect CSS imports in this project setup.
// @ts-ignore: Allow importing global CSS for styling
import "./global.css";

function RootNavigation() {
  const router = useRouter();
  const segments = useSegments();
  const [currentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    debugAsyncStorage("APP START STORAGE CHECK");
  }, []);

  useEffect(() => {
    const firstSegment = segments[0];
    const inAuthGroup = firstSegment === "auth";

    if (currentUser?.token && !inAuthGroup) {
      router.replace("/auth");
    }

    if (!currentUser?.token && inAuthGroup) {
      router.replace("/login");
    }
  }, [segments, currentUser]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="auth" />
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