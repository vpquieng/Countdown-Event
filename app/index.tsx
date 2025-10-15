import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import { eventListAtom, Event } from '../atoms/eventAtom';
import { useRouter } from 'expo-router';
import addButton from './components/add-event-button';

export default function Index() {
  const [events] = useAtom(eventListAtom);
  const router = useRouter();

  const renderItem = ({ item }: { item: Event }) => (
  <View className="w-[90%] p-4 mb-4 bg-white rounded-2xl shadow-md flex-row items-center justify-between">
    <TouchableOpacity
      className="flex-1 pr-3"
      onPress={() => router.push(`/tabs/edit-event?id=${item.id}`)}
      activeOpacity={0.8}
    >
      <Text className="text-gray-800 text-lg font-semibold">{item.title}</Text>
      <Text className="text-gray-600 text-sm">{item.date}</Text>
      <Text className="text-gray-600 text-sm">{item.time}</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => router.push(`/tabs/delete-task?id=${item.id}`)}
      className="ml-4"
      activeOpacity={0.8}
    >
      <Ionicons name="trash" size={22} color="red" />
    </TouchableOpacity>
  </View>
  );

  return (
    <View className='flex-1 bg-yellow-200 items-center pt-20 px-4'>
      <Text className='text-2xl font-bold text-gray-800'>Countdown Event App</Text>

      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
        className='w-full mt-4'
        ListEmptyComponent={
          <Text className='text-gray-500 text-lg mt-10'>
            No events yet. Add a new event!
          </Text>
        }
      />

      <TouchableOpacity
        onPress={() => router.push('/tabs/add-event')}
        className="absolute bottom-8 right-6 bg-white rounded-full w-16 h-16 items-center justify-center shadow-lg"
        activeOpacity={0.8}
      >
        <Text className='text-black text-4xl font-bold'>＋</Text>
      </TouchableOpacity>
    </View>
  );
}
