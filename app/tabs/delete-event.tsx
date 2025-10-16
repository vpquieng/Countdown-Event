import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAtom } from 'jotai';
import { eventListAtom, Event } from '../../atoms/eventAtom';

export default function DeleteEvent() {
    const router = useRouter();
    const [events, setEvents] = useAtom(eventListAtom);
    const { id } = useLocalSearchParams<{ id: string }>();

    const eventToDelete = events.find(event => event.id === id);

    if (!eventToDelete) {
    return (
      <View className="flex-1 justify-center items-center bg-yellow-200">
        <Text className="text-lg text-gray-600">Event not found.</Text>
      </View>
    );
  }
    const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete "${eventToDelete.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await setEvents(events.filter((event) => event.id !== id));
            Alert.alert('Deleted', 'Event has been deleted successfully.');
            router.push('/');
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-yellow-200 justify-center items-center px-6">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Delete Event
      </Text>
      <View className="bg-white p-6 rounded-lg w-full mb-6">
        <Text className="text-lg text-gray-700 font-semibold mb-1">
          {eventToDelete.title}
        </Text>
        <Text className="text-gray-600 mb-2">
          {eventToDelete.description || null}
        </Text>
        <Text className="text-gray-600">Date: {eventToDelete.date}</Text>
        <Text className="text-gray-600">Time: {eventToDelete.time}</Text>
      </View>

      <TouchableOpacity
        className="bg-red-500 px-6 py-3 rounded-lg w-full mb-3"
        onPress={handleDelete}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Delete
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-gray-300 px-6 py-3 rounded-lg w-full"
        onPress={() => router.back()}
      >
        <Text className="text-center text-lg text-gray-700 font-semibold">
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}