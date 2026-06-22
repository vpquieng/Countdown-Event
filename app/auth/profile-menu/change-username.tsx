import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { usersAtom, currentUserAtom, User } from "../../../atoms/userAtom";
import CustomTextInput from "../../components/custom-text-input";
import BackFooter from "../../components/back-footer";

export default function ChangeUsername() {
  const [users, setUsers] = useAtom(usersAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [username, setUsername] = useState(currentUser?.username || "");

  if (!currentUser) return null;

  const saveDisabled =
  !username.trim() ||
  username.trim().toLowerCase() === currentUser.username.toLowerCase();

  const handleSave = () => {
    if (!username.trim()) {
      Alert.alert("Invalid Username", "Username cannot be empty.");
      return;
    }

    const usernameExists = users.some(
      (u: User) =>
        u.id !== currentUser.id &&
        u.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (usernameExists) {
      Alert.alert("Username Taken", "Please choose another username.");
      return;
    }

    const updatedUser = { ...currentUser, username: username.trim() };

    const updatedUsers = users.map((u: User) =>
      u.id === currentUser.id ? updatedUser : u
    );

    setUsers(updatedUsers);
    setCurrentUser(updatedUser);

    Alert.alert("Success", "Username updated successfully.");
    router.back();
  };

  return (
    <View className="flex-1 bg-yellow-200 px-6 pt-20">
      <Text className="text-3xl font-bold text-center mb-8">
        Change Username
      </Text>

      <CustomTextInput
        placeholder="New Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TouchableOpacity
        disabled={saveDisabled}
        className={`p-4 rounded-xl ${saveDisabled ? "bg-gray-400" : "bg-green-500"}`}
        onPress={handleSave}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Save
        </Text>
      </TouchableOpacity>

      <BackFooter />
    </View>
  );
}