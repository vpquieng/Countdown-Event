import React from 'react';
import * as Notifications from 'expo-notifications';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAtom } from 'jotai';
import { eventNotificationMap } from '../../utils/handle-notification';
import { eventListAtom, Event } from '../../atoms/eventAtom';
import BackFooter from '../components/back-footer';

export default function cancelEvent(){
    const router = useRouter();
    const [events, setEvents] = useAtom(eventListAtom);
    const { id } = useLocalSearchParams<{ id: string }>();

    const eventToCancel = events.find(event => event.id === id);

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
                if (eventNotificationMap[eventToCancel.id]) {
                  for (const notifId of eventNotificationMap[eventToCancel.id]) {
                    await Notifications.cancelScheduledNotificationAsync(notifId);
                  }
                  delete eventNotificationMap[eventToCancel.id];
                }
                const updatedEvent = { 
                  ...eventToCancel, 
                  status: 'canceled',
                  NotificationScheduled: false,
                };
                await setEvents(events.map((event) => event.id === id ? updatedEvent : event));
                Alert.alert('Canceled', 'Event has been canceled successfully.');
                router.push('/');
              },
            },
          ]
        );
      };

    return(
        <View className="flex-1 bg-yellow-200 justify-center items-center px-6">
            <Text className="text-2xl font-bold text-gray-800 mb-4">
                Cancel Event
            </Text>
            <View className="bg-white p-6 rounded-lg w-full mb-6">
                <Text className="text-lg text-gray-700 font-semibold mb-1">
                    {eventToCancel.title}
                </Text>
                <Text className="text-gray-600 mb-2">
                    {eventToCancel.description || null}
                </Text>
                <Text className="text-gray-600">Date: {eventToCancel.date}</Text>
                <Text className="text-gray-600">Time: {eventToCancel.time}</Text>
            </View>

            <TouchableOpacity
                className="bg-red-500 px-6 py-3 rounded-lg w-full mb-3"
                onPress={handleCancel}
            >
                <Text className="text-white text-center text-lg font-semibold">
                    Cancel Event
                </Text>
            </TouchableOpacity>

            <BackFooter />
        </View>
    )
}