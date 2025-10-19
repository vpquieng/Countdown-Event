import { Stack } from "expo-router";
import { Provider } from "jotai";
import { useEffect } from "react";
import * as Notifications from 'expo-notifications';
import { requestNotificationPermission, setupNotificationChannel } from "../utils/handle-notification";
import "./global.css";

export default function RootLayout() {
  useEffect(() => {
    const initializeNotifications = async () => {
      await setupNotificationChannel(); // Android channel setup
      await requestNotificationPermission(); // Ask permission
    };

    initializeNotifications();
    
    return () => {
      Notifications.dismissAllNotificationsAsync();
    };
  }, []);

  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
