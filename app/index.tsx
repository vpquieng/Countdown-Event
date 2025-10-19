import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { eventListAtom } from "../atoms/eventAtom";
import { useRouter } from "expo-router";
import { scheduleEventNotification } from "../utils/handle-notification";
import AddButton from "./components/add-event-button";
import EventList from "./components/event-list";

export default function Index() {
  const [events, setEvents] = useAtom(eventListAtom);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updatedEvents = events.map((event) => {
        const eventDateTime = new Date(`${event.date}T${event.time}`);
        if (event.status === "canceled") {
          return event;
        }
        // Schedule notifications for upcoming events
        if (event.status === "upcoming") {
          scheduleEventNotification(event);
        }
        // Mark as complete when event time is reached
        if (event.status === "upcoming" && now >= eventDateTime) {
          return { ...event, status: "complete" };
        }
        return event;
      });
      setEvents(updatedEvents);
    }, 1000);

    return () => clearInterval(interval);
  }, [events, setEvents]);

  return (
    <View className="flex-1 bg-yellow-200 items-center pt-20 px-4">
      <Text className="text-2xl font-bold text-gray-800">
        Countdown Event App
      </Text>

      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventList
            item={item}
            onPressEdit={() => router.push(`/tabs/edit-event?id=${item.id}`)}
            onPressDelete={() => router.push(`/tabs/delete-event?id=${item.id}`)}
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
          events.length > 0 ? (
            <View className="w-full items-center">
              <AddButton />
            </View>
          ) : null
        }
      />

      {events.length === 0 && (
        <TouchableOpacity
          className="absolute bottom-8 right-6 bg-white rounded-full w-16 h-16 items-center justify-center shadow-lg"
          activeOpacity={0.8}
          onPress={() => router.push("/tabs/add-event")}
        >
          <Ionicons name="add" size={40} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}
