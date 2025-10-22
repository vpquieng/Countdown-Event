import { View, Text } from "react-native";
import { Image } from "expo-image";

export default function PermissionDenied() {
  return (
    <View className="flex-1 bg-yellow-200 items-center justify-center px-6">
        <Image
            source={require('../../assets/access-denied.png')}
            style={{ width: 100, height: 100}}
            contentFit="contain"
        />
        <Text className="text-center text-lg font-semibold text-gray-500 mt-6 leading-tight">
            Sorry, please turn on your notification permission in your device settings to continue. Thank you.
        </Text>
    </View>
  );
}