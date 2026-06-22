import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { usersAtom, currentUserAtom, User } from "../../../atoms/userAtom";
import BackFooter from "../../components/back-footer";

export default function DeleteProfile() {
  const [users, setUsers] = useAtom(usersAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  if (!currentUser) return null;

  const handleDeleteProfile = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete your profile? This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedUsers = users.filter(
              (u: User) => u.id !== currentUser.id
            );

            setUsers(updatedUsers);
            setCurrentUser(null);

            router.replace("/login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-1 bg-yellow-200 px-6 pt-20">
      <Text className="text-3xl font-bold text-center mb-4">
        Delete Profile
      </Text>

      <Text className="text-center text-gray-700 text-lg mb-8">
        This will permanently remove your account and all saved events.
      </Text>

      <TouchableOpacity
        className="bg-red-600 p-4 rounded-xl"
        onPress={handleDeleteProfile}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Delete My Profile
        </Text>
      </TouchableOpacity>

      <BackFooter />
    </View>
  );
}