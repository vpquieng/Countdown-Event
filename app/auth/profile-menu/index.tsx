import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAtom } from "jotai";
import BackFooter from "../../components/back-footer";
import { currentUserAtom } from "../../../atoms/userAtom";

export default function ProfileMenu() {

const [currentUser] = useAtom(currentUserAtom);

  return (
    <View className="flex-1 bg-yellow-200 px-6 pt-20">
      <Text className="text-3xl font-bold text-center mb-8">
        {currentUser?.username}
      </Text>

      <TouchableOpacity
        className="bg-white p-4 rounded-xl mb-4"
        onPress={() => router.push("/auth/profile-menu/change-name")}
      >
        <Text className="text-lg font-semibold">Change Name</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white p-4 rounded-xl mb-4"
        onPress={() => router.push("/auth/profile-menu/change-username")}
      >
        <Text className="text-lg font-semibold">Change Username</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white p-4 rounded-xl mb-4"
        onPress={() => router.push("/auth/profile-menu/change-email")}
      >
        <Text className="text-lg font-semibold">Change Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white p-4 rounded-xl mb-4"
        onPress={() => router.push("/auth/profile-menu/change-password")}
      >
        <Text className="text-lg font-semibold">Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-red-500 p-4 rounded-xl"
        onPress={() => router.push("/auth/profile-menu/delete-profile")}
      >
        <Text className="text-lg font-semibold text-white">Delete Profile</Text>
      </TouchableOpacity>

      <BackFooter />
    </View>
  );
}