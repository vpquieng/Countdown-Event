import { Stack, Redirect, useSegments, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../atoms/userAtom";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  requestNotificationPermission,
  setupNotificationChannel,
} from "../../utils/handle-notification";
import HeaderTab from "../components/header-tab";
import { debugAsyncStorage } from "../../utils/debug-storage";

export default function AuthLayout() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const segments = useSegments();

  const [permissionChecked, setPermissionChecked] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(true);

  useEffect(() => {
    const initializeNotifications = async () => {
      await setupNotificationChannel();
      const granted = await requestNotificationPermission();
      setHasPermission(granted);
      setPermissionChecked(true);
    };

    initializeNotifications();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          style: "destructive",
          onPress: () => {
            setCurrentUser(null);

            setTimeout(() => {
              debugAsyncStorage("AFTER LOGOUT");
            }, 500);

            router.replace("/login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (!permissionChecked) return null;

  const onPermissionPage = segments?.includes("permission-denied");

  if (!hasPermission && !onPermissionPage) {
    return <Redirect href="/auth/permission-denied" />;
  }

  if (!currentUser?.token) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => (
            <HeaderTab
              title="Countdown Event App"
              showMenu
              showLogout
              onPressMenu={() => router.push("/auth/profile-menu")}
              onPressLogout={handleLogout}
            />
          ),
        }}
      />

      <Stack.Screen
        name="permission-denied"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="profile-menu/index"
        options={{ 
          headerShown: true,
          header: () => (
            <HeaderTab
              title="Profile Menu"
              showLogout
              onPressLogout={handleLogout}
            />
          )
        }}
      />

      <Stack.Screen
        name="profile-menu/change-name"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="profile-menu/change-username"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="profile-menu/change-email"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="profile-menu/change-password"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="profile-menu/delete-profile"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="tabs/add-event"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="tabs/cancel-event"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="tabs/complete-event"
        options={{
          headerShown: true,
          header: () => <HeaderTab title="Complete Events" />,
        }}
      />

      <Stack.Screen
        name="tabs/delete-event"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="tabs/edit-event"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="tabs/view-event"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}