import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { currentUserAtom } from "../atoms/userAtom";

export default function Index() {
  const router = useRouter();
  const [currentUser] = useAtom(currentUserAtom);

  return (
    <View className="flex-1 items-center justify-center bg-yellow-200 px-6">
      <Text className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Welcome to Countdown Event App
      </Text>
      <Text className="text-lg text-gray-700 text-center mb-8">
        Keep track of your important events with reminders and countdowns.
      </Text>

      {/* Next Button */}
      <TouchableOpacity
        className="bg-green-500 w-full py-4 rounded-lg mb-4"
        onPress={() => router.push("/register")}
      >
        <Text className="text-center text-white font-semibold text-lg">
          Next
        </Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text className="text-sm text-gray-700">
        I already have an account.{" "}
        <Text
          className="text-blue-600 font-semibold"
          onPress={() => router.push("/login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
}
