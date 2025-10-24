import React, { useEffect, useLayoutEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { usersAtom, currentUserAtom, User } from "../../atoms/userAtom";
import { useRouter, useNavigation } from "expo-router";
import { scheduleEventNotification } from "../../utils/handle-notification";
import { sortEventsByStatus } from "../../utils/sort-event-status";
import { logoutUser } from "../../utils/auth-utils";
import AddButton from "../components/add-event-button";
import EventList from "../components/event-list";

export default function Index() {
  const router = useRouter();
  const navigation = useNavigation();
  const [users, setUsers] = useAtom(usersAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Countdown Event App",
      headerTitleAlign: "center",
      headerRight: () => (
        <TouchableOpacity
          className="mr-4 p-2"
          onPress={() => {
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
                    const loggedOutUser = logoutUser();
                    setCurrentUser(loggedOutUser);
                    router.replace("/login");
                  },
                },
              ],
              { cancelable: true }
            );
          }}
        >
          <MaterialCommunityIcons name="logout" size={22} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  //  Update user events
  const updateUserEvents = (updatedEvents: any[]) => {
    if (!currentUser) return;

    const updatedUsers = users.map((u: User) =>
      u.id === currentUser.id ? { ...u, events: updatedEvents } : u
    );

    setUsers(updatedUsers);
    setCurrentUser({ ...currentUser, events: updatedEvents });
  };

  // Auto-update event status + trigger notifications
  useEffect(() => {
    if (!currentUser) return;

    const interval = setInterval(() => {
      const now = new Date();
      const updatedEvents = currentUser.events.map((event) => {
        const eventDateTime = new Date(`${event.date}T${event.time}`);
        if (event.status === "canceled") return event;

        if (event.status === "upcoming" && !event.notificationScheduled) {
          scheduleEventNotification(event);
          return { ...event, notificationScheduled: true };
        }

        if (event.status === "upcoming" && now >= eventDateTime) {
          return { ...event, status: "complete" };
        }
        return event;
      });

      updateUserEvents(sortEventsByStatus(updatedEvents));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentUser?.events]);

  if (!currentUser) {
    return (
      <View className="flex-1 items-center justify-center bg-yellow-200">
        <Text className="text-lg">Redirecting...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-yellow-200 items-center pt-20 px-4">
      <Text className="text-lg text-gray-700">Welcome, {currentUser.name} 👋</Text>

      <FlatList
        data={currentUser.events.filter(event => event.status !== "complete")}
        renderItem={({ item }) => (
          <EventList
            item={item}
            onPressEdit={() => router.push(`/auth/tabs/edit-event?id=${item.id}`)}
            onPressDelete={() => router.push(`/auth/tabs/delete-event?id=${item.id}`)}
            onPressView={() => router.push(`/auth/tabs/view-event?id=${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        className="w-full mt-4"
        contentContainerClassName="items-center pb-10"
        ListEmptyComponent={
          <Text className="text-gray-500 text-lg mt-10 mb-10 text-center">
            No events yet. Add a new event!
          </Text>
        }
        ListFooterComponent={
          currentUser.events.length > 0 ? (
            <View className="w-full items-center">
              <AddButton
                onPressAdd={() => router.push('/auth/tabs/add-event')}
              />
            </View>
          ) : null
        }
      />

      {currentUser.events.length === 0 && (
        <TouchableOpacity
          className="absolute bottom-8 right-6 bg-white rounded-full w-16 h-16 items-center justify-center shadow-lg"
          activeOpacity={0.8}
          onPress={() => router.push("/auth/tabs/add-event")}
        >
          <Ionicons name="add" size={40} color="black" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        className="absolute bottom-8 left-6 bg-green-500 rounded-full w-16 h-16 items-center justify-center shadow-lg"
        activeOpacity={0.8}
        onPress={() => router.push("/auth/tabs/complete-event")}
      >
        <MaterialCommunityIcons name="check" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
}
