import react from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type HeaderTabProps = {
    title: string;
    showLogout?: boolean;
    onPressLogout?: () => void;
};

export default function HeaderTab({ title, showLogout = false, onPressLogout }: HeaderTabProps) {
    return (
    <View className="bg-yellow-400 pt-14 pb-5 px-4 flex-row items-center justify-center">
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
