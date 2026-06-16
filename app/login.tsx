import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { router } from "expo-router";
import { useAtom } from "jotai";
import CustomTextInput from "./components/custom-text-input";
import { usersAtom, currentUserAtom, User } from "../atoms/userAtom";
import { loginUser } from "../utils/auth-utils";
import { debugAsyncStorage } from "../utils/debug-storage";

export default function Login() {
  const [users] = useAtom(usersAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginDisable = !email.trim() || !password;

  useEffect(() => {
    debugAsyncStorage("LOGIN SCREEN STORAGE CHECK");
  }, []);

  const handleLogin = async () => {
    debugAsyncStorage("BEFORE LOGIN");

    const existingUser = users.find(
      (u: User) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!existingUser) {
      Alert.alert("Login Failed", "Invalid email or password.");
      return;
    }

    const loggedInUser = await loginUser(existingUser);

    setCurrentUser(loggedInUser);

    setTimeout(() => {
      debugAsyncStorage("AFTER LOGIN");
    }, 500);

    router.replace("/auth");
  };

  return (
    <View className="flex-1 justify-center items-center bg-yellow-200 px-6">
      <Text className="text-3xl font-bold mb-8 text-gray-800">Login</Text>

      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        isPassword
        containerClassName="w-full bg-white rounded-lg mb-6"
      />
  

      <TouchableOpacity
        className={`w-full p-4 rounded-lg items-center ${
          loginDisable ? "bg-gray-400" : "bg-green-500"
        }`}
        onPress={handleLogin}
        disabled={loginDisable}
      >
        <Text className="text-white font-semibold">Login</Text>
      </TouchableOpacity>

      <Text className="text-center mt-4">
        Don&apos;t have an account?{" "}
        <Text
          className="text-blue-600 font-semibold"
          onPress={() => router.push("/register")}
        >
          Register
        </Text>
      </Text>
    </View>
  );
}