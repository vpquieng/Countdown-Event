import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AddButton() {
  const router = useRouter();

  return (
    <View className="w-[90%] p-4 mb-4 bg-white rounded-2xl flex-row items-center justify-between">
      <TouchableOpacity
        onPress={() => router.push('/tabs/add-event')}
        activeOpacity={0.8}
        className="flex-1 items-center justify-center"
      >
        <Ionicons name="add" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
}