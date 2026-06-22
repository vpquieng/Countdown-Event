import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { usersAtom, currentUserAtom, User } from "../../../atoms/userAtom";
import CustomTextInput from "../../components/custom-text-input";
import BackFooter from "../../components/back-footer";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export default function ChangePassword() {
  const [users, setUsers] = useAtom(usersAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!currentUser) return null;

  const saveDisabled =
  !currentPassword ||
  !newPassword ||
  !confirmPassword ||
  newPassword === currentUser.password;

  const handleSave = () => {
    if (currentPassword !== currentUser.password) {
      Alert.alert("Incorrect Password", "Current password is incorrect.");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters and include at least one letter and one number."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    const updatedUser = {
      ...currentUser,
      password: newPassword,
    };

    const updatedUsers = users.map((u: User) =>
      u.id === currentUser.id ? updatedUser : u
    );

    setUsers(updatedUsers);
    setCurrentUser(updatedUser);

    Alert.alert("Success", "Password updated successfully.");
    router.back();
  };

  return (
    <View className="flex-1 bg-yellow-200 px-6 pt-20">
      <Text className="text-3xl font-bold text-center mb-8">
        Change Password
      </Text>

      <CustomTextInput
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        isPassword
      />

      <CustomTextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        isPassword
      />

      <CustomTextInput
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        isPassword
        containerClassName="w-full bg-white rounded-lg mb-6"
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