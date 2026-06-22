import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { usersAtom, currentUserAtom, User } from "../../../atoms/userAtom";
import CustomTextInput from "../../components/custom-text-input";
import BackFooter from "../../components/back-footer";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ChangeEmail() {
  const [users, setUsers] = useAtom(usersAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [email, setEmail] = useState(currentUser?.email || "");

  if (!currentUser) return null;

  const saveDisabled =
  !email.trim() ||
  email.trim().toLowerCase() === currentUser.email.toLowerCase();

  const handleSave = () => {
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email.");
      return;
    }

    const emailExists = users.some(
      (u: User) =>
        u.id !== currentUser.id &&
        u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists) {
      Alert.alert("Email Taken", "This email is already used.");
      return;
    }

    const updatedUser = {
      ...currentUser,
      email: email.trim().toLowerCase(),
    };

    const updatedUsers = users.map((u: User) =>
      u.id === currentUser.id ? updatedUser : u
    );

    setUsers(updatedUsers);
    setCurrentUser(updatedUser);

    Alert.alert("Success", "Email updated successfully.");
    router.back();
  };

  return (
    <View className="flex-1 bg-yellow-200 px-6 pt-20">
      <Text className="text-3xl font-bold text-center mb-8">Change Email</Text>

      <CustomTextInput
        placeholder="New Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
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