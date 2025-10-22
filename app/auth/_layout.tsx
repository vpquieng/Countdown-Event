import { Stack, Redirect } from "expo-router";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../atoms/userAtom";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { requestNotificationPermission, setupNotificationChannel } from "../../utils/handle-notification";
import "../global.css";

export default function AuthLayout() {
  const [currentUser] = useAtom(currentUserAtom);
  const [notificationsAllowed, setNotificationsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const initializeNotifications = async () => {
      await setupNotificationChannel();
      const granted = await requestNotificationPermission();
      setNotificationsAllowed(granted);
    };

    initializeNotifications();

    // Auto-check permission every 2 seconds
    const interval = setInterval(async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setNotificationsAllowed(status === "granted");
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!currentUser) {
    return <Redirect href="/login" />;
  }

  // If permission is denied, lock inside permission-denied page
  if (notificationsAllowed === false) {
    return <Redirect href="/permission-denied" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
