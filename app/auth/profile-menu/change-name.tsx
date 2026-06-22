import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { usersAtom, currentUserAtom, User } from "../../../atoms/userAtom";
import CustomTextInput from "../../components/custom-text-input";
import BackFooter from "../../components/back-footer";

export default function ChangeName() {
  const [users, setUsers] = useAtom(usersAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [name, setName] = useState(currentUser?.name || "");
  
  if (!currentUser) return null;

  const saveDisabled = !name.trim() || name.trim() === currentUser.name;

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Invalid Name", "Name cannot be empty.");
      return;
    }

    const updatedUser = { ...currentUser, name: name.trim() };

    const updatedUsers = users.map((u: User) =>
      u.id === currentUser.id ? updatedUser : u
    );

    setUsers(updatedUsers);
    setCurrentUser(updatedUser);

    Alert.alert("Success", "Name updated successfully.");
    router.back();
  };

  return (
    <View className="flex-1 bg-yellow-200 px-6 pt-20">
      <Text className="text-3xl font-bold text-center mb-8">Change Name</Text>

      <CustomTextInput
        placeholder="New Name"
        value={name}
        onChangeText={setName}
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