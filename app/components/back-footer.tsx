import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BackFooter() {
  const router = useRouter();

  return (
    <View className="absolute bottom-10 left-4">
      <TouchableOpacity onPress={() => router.back()} className="p-2 bg-white rounded-full shadow">
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}