import { Stack, Redirect, useSegments } from "expo-router";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../atoms/userAtom";
import { useEffect, useState } from "react";
import {
  requestNotificationPermission,
  setupNotificationChannel,
} from "../../utils/handle-notification";


export default function AuthLayout() {
  const [currentUser] = useAtom(currentUserAtom);
  const segments = useSegments();
  const [permissionChecked, setPermissionChecked] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(true);

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
  const onPermissionPage = segments?.includes("permission-denied");

  if (!hasPermission && !onPermissionPage) {
    return <Redirect href="/auth/permission-denied" />
  }

  if (!currentUser) return <Redirect href="/login" />;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#facc15" },
        headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
      }}
    >
      {/* Main screen that shows your tab navigator */}
      <Stack.Screen 
        name="index" 
        options={{ title: "Home", headerBackVisible: false }} />

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
