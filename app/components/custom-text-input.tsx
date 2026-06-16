import React, { useState } from "react";
import { TextInput, View, TouchableOpacity, TextInputProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CustomTextInputProps = TextInputProps & {
    isPassword?: boolean;
    containerClassName?: String;
};

export default function CustomTextInput({
    isPassword = false,
    containerClassName = "w-full bg-white rounded-lg mb-4",
    className = "flex-1 p-4 text-base",
    secureTextEntry,
    ...props
}: CustomTextInputProps) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    
    return (
        <View className={`${containerClassName} flex-row items-center`}>
            <TextInput
                className={className}
                secureTextEntry={isPassword ? !passwordVisible : secureTextEntry}
                {...props}
            />
            {isPassword && (
                <TouchableOpacity
                    className="px-4"
                    onPress={() => setPasswordVisible(!passwordVisible)}
                >
                    <MaterialCommunityIcons
                        name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}