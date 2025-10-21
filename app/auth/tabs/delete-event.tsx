import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAtom } from 'jotai';
import { usersAtom, currentUserAtom, User } from '../../../atoms/userAtom';

export default function DeleteEvent() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [users, setUsers] = useAtom(usersAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  if (!currentUser) {
    return (
      <View className="flex-1 justify-center items-center bg-yellow-200">
        <Text className="text-lg text-gray-600">Redirecting...</Text>
      </View>
    );
  }

  const eventToDelete = currentUser.events.find(event => event.id === id);

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
          onPress: () => {
            const updatedEvents = currentUser.events.filter(event => event.id !== id);

            const updatedUsers = users.map((u: User) =>
              u.id === currentUser.id ? { ...u, events: updatedEvents } : u
            );

            setUsers(updatedUsers);
            setCurrentUser({ ...currentUser, events: updatedEvents });

            Alert.alert('Success', 'Event deleted successfully.');
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-yellow-200 justify-center items-center px-6">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Delete Event</Text>

      <View
        className={`p-6 rounded-lg w-full mb-6 ${
          eventToDelete.status === 'complete'
            ? 'bg-green-400'
            : eventToDelete.status === 'canceled'
            ? 'bg-rose-400'
            : 'bg-white'
        }`}
      >
        <Text className="text-lg text-gray-700 font-semibold mb-1">{eventToDelete.title}</Text>
        <Text className="text-gray-600 mb-2">
          {eventToDelete.description || 'No description'}
        </Text>
        <Text className="text-gray-600">Date: {eventToDelete.date}</Text>
        <Text className="text-gray-600">Time: {eventToDelete.time}</Text>
      </View>

      <TouchableOpacity
        onPress={handleDelete}
        className="bg-red-500 px-6 py-3 rounded-lg w-full mb-3"
      >
        <Text className="text-white text-center text-lg font-semibold">Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-gray-400 px-6 py-3 rounded-lg w-full"
      >
        <Text className="text-center text-lg text-white font-semibold">Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}
