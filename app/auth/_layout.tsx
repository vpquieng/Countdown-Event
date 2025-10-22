import { Stack, Slot, Redirect } from "expo-router";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../atoms/userAtom";
import { useEffect, useState } from "react";
import {
  requestNotificationPermission,
  setupNotificationChannel,
} from "../../utils/handle-notification";


export default function AuthLayout() {
  const [currentUser] = useAtom(currentUserAtom);
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [hasPermission, setHasPermission] = useState(true);

  // Initialize notifications
  useEffect(() => {
    const initializeNotifications = async () => {
      await setupNotificationChannel();
      const granted = await requestNotificationPermission();
      setHasPermission(granted);
      setPermissionChecked(true);
    };
    initializeNotifications();
  }, []);

  if (!permissionChecked) return null;

  // Redirect if no user or no permission
  if (!currentUser) return <Redirect href="/login" />;
  if (!hasPermission) return <Redirect href="/permission-denied" />;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#facc15" },
        headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
      }}
    >
      {/* Main screen that shows your tab navigator */}
      <Stack.Screen name="index" options={{ title: "Home" }} />

      {/* Permission denied screen */}
      <Stack.Screen
        name="permission-denied"
        options={{ title: "Permission Denied", headerShown: false }}
      />

      {/* Tabs screens (add-event, cancel-event, etc.) */}
      <Stack.Screen
        name="tabs/add-event"
        options={{ title: "Add Event", headerShown: false }}
      />
      <Stack.Screen
        name="tabs/cancel-event"
        options={{ title: "Cancel Event", headerShown: false }}
      />
      <Stack.Screen
        name="tabs/delete-event"
        options={{ title: "Delete Event", headerShown: false }}
      />
      <Stack.Screen
        name="tabs/edit-event"
        options={{ title: "Edit Event", headerShown: false }}
      />
    </Stack>
  );
}
