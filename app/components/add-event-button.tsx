import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function addButton() {
  const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push('/tabs/add-event')}
            className="text-gray-800 text-lg font-semibold"
        >
            <Ionicons name="add" size={40} color="black" />
        </TouchableOpacity>
    )
}