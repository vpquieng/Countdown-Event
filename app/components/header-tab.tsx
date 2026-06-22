import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

type HeaderTabProps = {
  title: string;
  showLogout?: boolean;
  showMenu?: boolean;
  onPressLogout?: () => void;
  onPressMenu?: () => void;
};

export default function HeaderTab({
  title,
  showLogout = false,
  showMenu = false,
  onPressLogout,
  onPressMenu,
}: HeaderTabProps) {
  return (
    <View className="bg-yellow-400 pt-14 pb-5 px-4 flex-row items-center justify-center">
      {showMenu && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressMenu}
          className="absolute left-6 bottom-4"
        >
          <MaterialIcons name="menu" size={32} color="black" />
        </TouchableOpacity>
      )}

      <Text className="text-2xl font-bold text-gray-900 text-center">
        {title}
      </Text>

      {showLogout && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onPressLogout}
          className="absolute right-6 bottom-4"
        >
          <MaterialCommunityIcons name="logout" size={30} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}