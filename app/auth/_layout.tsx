import { Stack, Redirect } from "expo-router";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../atoms/userAtom";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { requestNotificationPermission, setupNotificationChannel } from "../../utils/handle-notification";
import "../global.css"

export default function AuthLayout() {
  const [currentUser] = useAtom(currentUserAtom);
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

  if (!currentUser) {
    return <Redirect href="/login" />;
  }

  return (
      <Stack screenOptions={{ headerShown: false }} />
  );
}
