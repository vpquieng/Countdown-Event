import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAtom } from 'jotai';
import { eventListAtom, Event } from '../../atoms/eventAtom';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format, set } from 'date-fns';
import BackFooter from '../components/back-footer';

export default function EditEvent() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [events, setEvents] = useAtom(eventListAtom);

    const eventToEdit = events.find(event => event.id === id);

    const [title, setTitle] = useState(eventToEdit?.title || '');
    const [date, setDate] = useState<Date | null>(
        eventToEdit ? new Date(`${eventToEdit.date}T${eventToEdit.time}`) : null
    );
    const [time, setTime] = useState<Date | null>(
        eventToEdit ? new Date(`${eventToEdit.date}T${eventToEdit.time}`) : null
    );
    const [description, setDescription] = useState(eventToEdit?.description || '');

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        if (!eventToEdit) {
            Alert.alert('Error', 'Event not found.');
            router.back();
        }
    }, [eventToEdit]);

    if (!eventToEdit) {
        return null;
    }

    const isEdited =
        title !== eventToEdit.title ||
        description !== eventToEdit.description ||
        (date && format(date, 'yyyy-MM-dd') !== eventToEdit.date) ||
        (time && format(time, 'HH:mm') !== eventToEdit.time);

    const isDisabled = !title.trim() || !date || !time || !isEdited;

    const handleConfirmDate = (selectedDate: Date) => {
        setDate(selectedDate);
        setShowDatePicker(false);
    };

    const handleConfirmTime = (selectedTime: Date) => {
        setTime(selectedTime);
        setShowTimePicker(false);
    };

    const handleSave = () => {
        if (isDisabled) {
            Alert.alert('No Changes', 'Please make changes before saving.');
            return;
        }

        const updatedEvent: Event = {
            ...eventToEdit,
            title,
            description,
            date: format(date!, 'yyyy-MM-dd'),
            time: format(time!, 'HH:mm'),
        };

        setEvents(events.map(event => (event.id === id ? updatedEvent : event)));

        Alert.alert('Success', 'Event updated successfully!');
        router.back();
    };
    return (
    <View className="flex-1 bg-yellow-200 px-6 pt-16">
      <Text className="text-gray-800 text-3xl font-bold mb-8 text-center">Edit Event</Text>

      {/* Title Input */}
      <TextInput
        className="bg-white rounded-xl p-4 mb-4 text-lg"
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Description Input */}
      <TextInput
        className="bg-white rounded-xl p-4 mb-4 text-lg"
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Date Picker */}
      <TouchableOpacity
        className="bg-white rounded-xl p-4 mb-4"
        onPress={() => setShowDatePicker(true)}
      >
        <Text className="text-lg text-gray-700">
          {date ? `📅 ${format(date, 'MMMM dd, yyyy')}` : 'Select Date'}
        </Text>
      </TouchableOpacity>

      {/* Time Picker */}
      <TouchableOpacity
        className="bg-white rounded-xl p-4 mb-4"
        onPress={() => setShowTimePicker(true)}
      >
        <Text className="text-lg text-gray-700">
          {time ? `⏰ ${format(time, 'hh:mm a')}` : 'Select Time'}
        </Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setShowDatePicker(false)}
        minimumDate={new Date()}
      />

      {/* Time Picker Modal */}
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setShowTimePicker(false)}
      />

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        disabled={isDisabled}
        className={`mt-6 rounded-full py-4 ${
          isDisabled ? 'bg-gray-400' : 'bg-green-500'
        }`}
      >
        <Text className="text-center text-white text-lg font-semibold">Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push(`/tabs/delete-task?id=${id}`)}
        className={`mt-6 rounded-full py-4 bg-red-600`}
      >
        <Text className="text-center text-white text-lg font-semibold">Delete Event</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <BackFooter />
    </View>
  );
}
