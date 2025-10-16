import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BackFooter() {
  const router = useRouter();

  return (
    <>
      <View className="h-20"/>
      <View className="absolute bottom-0 left-0 right-0 h-20 border-t-[#e7e7e7] bg-[#f8f8f8] items-start px-6 justify-center">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          className="flex-row items-center"
        >
          <Ionicons name="chevron-back" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
}