import React from 'react';
import * as Notifications from 'expo-notifications';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAtom } from 'jotai';
import { usersAtom, currentUserAtom, User } from '../../../atoms/userAtom';
import { eventNotificationMap } from '../../../utils/handle-notification';
import BackFooter from '../../components/back-footer';

export default function CancelEvent() {
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

  const eventToCancel = currentUser.events.find(event => event.id === id);

  if (!eventToCancel) {
    return (
      <View className="flex-1 justify-center items-center bg-yellow-200">
        <Text className="text-lg text-gray-600">Event not found.</Text>
      </View>
    );
  }

  const handleCancel = () => {
    Alert.alert(
      'Confirm Cancel',
      `Are you sure you want to cancel "${eventToCancel.title}"?`,
      [
        { text: 'Back', style: 'cancel' },
        {
          text: 'Cancel Event',
          style: 'destructive',
          onPress: async () => {
            // Cancel all scheduled notifications for this event
            if (eventNotificationMap[eventToCancel.id]) {
              for (const notifId of eventNotificationMap[eventToCancel.id]) {
                await Notifications.cancelScheduledNotificationAsync(notifId);
              }
              delete eventNotificationMap[eventToCancel.id];
            }

            // Update event status to canceled
            const updatedEvents = currentUser.events.map(event =>
              event.id === id
                ? { ...event, status: 'canceled', notificationScheduled: false }
                : event
            );

            // Update user state and storage
            const updatedUsers = users.map((u: User) =>
              u.id === currentUser.id ? { ...u, events: updatedEvents } : u
            );

            setUsers(updatedUsers);
            setCurrentUser({ ...currentUser, events: updatedEvents });

            Alert.alert('Event Canceled', 'The event has been successfully canceled.');
            router.replace('/auth');
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-yellow-200 justify-center items-center px-6">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Cancel Event</Text>

      <View className="bg-white p-6 rounded-lg w-full mb-6">
        <Text className="text-lg text-gray-700 font-semibold mb-1">
          {eventToCancel.title}
        </Text>
        <Text className="text-gray-600 mb-2">
          {eventToCancel.description || 'No description'}
        </Text>
        <Text className="text-gray-600">Date: {eventToCancel.date}</Text>
        <Text className="text-gray-600">Time: {eventToCancel.time}</Text>
      </View>

      <TouchableOpacity
        onPress={handleCancel}
        className="bg-red-500 px-6 py-3 rounded-lg w-full mb-3"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Cancel Event
        </Text>
      </TouchableOpacity>

      <BackFooter />
    </View>
  );
}
