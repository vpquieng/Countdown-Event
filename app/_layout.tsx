import React from "react";
import { Provider } from "jotai";
import { Stack, Slot } from "expo-router";
import "./global.css"

export default function RootLayout() {
  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{title: "Welcome"}} />

        <Stack.Screen name="login" options={{title: "Sign in"}} />

        <Stack.Screen name="register" options={{title: "Sign up"}} />
      </Stack>
    </Provider>
  );
}
