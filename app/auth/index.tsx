import React, { useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { usersAtom, currentUserAtom, User } from "../../atoms/userAtom";
import { useRouter } from "expo-router";
import { scheduleEventNotification } from "../../utils/handle-notification";
import { sortEventsByStatus } from "../../utils/sort-event-status";
import AddButton from "../components/add-event-button";
import EventList from "../components/event-list";

export default function Index() {
  const router = useRouter();
  const [users, setUsers] = useAtom(usersAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
    }
  }, [currentUser]);

  // Update user events
  const updateUserEvents = (updatedEvents: any[]) => {
    if (!currentUser) return;

    const updatedUsers = users.map((u: User) =>
      u.id === currentUser.id ? { ...u, events: updatedEvents } : u
    );

    setUsers(updatedUsers);
    setCurrentUser({ ...currentUser, events: updatedEvents });
  };

  // Auto-update event status + schedule notifications
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
      <Text className="text-2xl font-bold text-gray-800">
        Welcome, {currentUser.name}
      </Text>
      <Text className="text-2xl font-bold text-gray-800">Countdown Event App</Text>

      <FlatList
        data={currentUser.events}
        renderItem={({ item }) => (
          <EventList
            item={item}
            onPressEdit={() => router.push(`/auth/tabs/edit-event?id=${item.id}`)}
            onPressDelete={() => router.push(`/auth/tabs/delete-event?id=${item.id}`)}
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
              <AddButton />
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
    </View>
  );
}
