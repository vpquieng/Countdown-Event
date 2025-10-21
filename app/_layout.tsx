import { Stack } from "expo-router";
import { Provider } from "jotai";
import React from "react";
import "global.css"

export default function RootLayout() {
  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false }} />;
    </Provider>
  );
}