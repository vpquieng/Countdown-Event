import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { usersAtom, currentUserAtom } from "../../../atoms/userAtom";
import BackFooter from "../../components/back-footer";

export default function ViewEvent() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [users] = useAtom(usersAtom);
  const [currentUser] = useAtom(currentUserAtom);

  if (!currentUser) {
    return (
      <View className="flex-1 justify-center items-center bg-yellow-200">
        <Text className="text-lg text-gray-600">Redirecting...</Text>
      </View>
    );
  }

  const eventToView = currentUser.events.find((event) => event.id === id);

  if (!eventToView) {
    return (
      <View className="flex-1 justify-center items-center bg-yellow-200">
        <Text className="text-lg text-gray-600">Event not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-yellow-200 justify-center items-center px-6">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Event Information</Text>

      <View
        className={`p-6 rounded-lg w-full mb-6 ${
          eventToView.status === "complete"
            ? "bg-green-400"
            : eventToView.status === "canceled"
            ? "bg-rose-400"
            : "bg-white"
        }`}
      >
        <Text className="text-lg text-gray-700 font-semibold mb-1">
          {eventToView.title}
        </Text>
        <Text className="text-gray-600 mb-2">
          {eventToView.description || "No description"}
        </Text>
        <Text className="text-gray-600">Date: {eventToView.date}</Text>
        <Text className="text-gray-600">Time: {eventToView.time}</Text>
      </View>
      <BackFooter />
    </View>
  );
}
