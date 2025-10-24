import React from "react";
import { View, Text, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../../atoms/userAtom";
import EventList from "../../components/event-list";
import BackFooter from "../../components/back-footer";

export default function CompleteEvent() {
  const router = useRouter();
  const [currentUser] = useAtom(currentUserAtom);

  if (!currentUser) return null;

  // Filter only completed events
  const completedEvents = currentUser.events.filter(
    (e) => e.status === "complete"
  );

  return (
    <View className="flex-1 bg-yellow-200 items-center pt-20 px-4">
      <Text className="text-lg text-gray-700">Welcome, {currentUser.name} 👋</Text>

      <FlatList
        data={completedEvents}
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
          <Text className="text-gray-500 text-lg mt-10 text-center">
            No completed events yet.
          </Text>
        }
      />
      <BackFooter/>
    </View>
  );
}
