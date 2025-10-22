import React from "react";
import { Provider } from "jotai";
import { Stack, Slot } from "expo-router";
import "./global.css"

export default function RootLayout() {
  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false }}>
        <Slot />
      </Stack>
    </Provider>
  );
}
