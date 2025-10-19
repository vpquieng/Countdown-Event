import React from "react"; 
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Event } from "../../atoms/eventAtom";
import CountdownTimer from "./countdown-timer";

interface EventListProps {
  item: Event;
  onPressEdit: () => void;
  onPressDelete: () => void;
}

export default function EventList({ item, onPressEdit, onPressDelete }: EventListProps) {
    return (
        <View
          className={`w-[90%] p-4 mb-4 rounded-2xl flex-row items-center justify-between ${
            item.status === "complete"
              ? "bg-green-400"
              : item.status === "canceled"
              ? "bg-rose-400"
              : "bg-white"
          }`}
        >
          <TouchableOpacity
            className="flex-1 pr-3"
            onPress= {onPressEdit}
            activeOpacity={0.8}
          >
            <Text className="text-gray-800 text-lg font-semibold">
              {item.title}
            </Text>
            <Text className="text-gray-600 text-sm">
              {item.date} • {item.time}
            </Text>
              <CountdownTimer 
                date={item.date} 
                time={item.time} 
                status={item.status} 
              />
            <Text className="text-gray-600 text-sm mt-1">Status: {item.status}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress= {onPressDelete}
            className="ml-4"
            activeOpacity={0.8}
          >
            <Ionicons name="trash" size={22} color="black" />
          </TouchableOpacity>
        </View>
    );
}