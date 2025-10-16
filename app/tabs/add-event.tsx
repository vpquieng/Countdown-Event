import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { eventListAtom, Event } from '../../atoms/eventAtom';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import BackFooter from '../components/back-footer';

export default function AddEvent() {
    const router = useRouter();
    const [events, setEvents] = useAtom(eventListAtom);

    const [title, setTitle] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [description, setDescription] = useState('');

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const isDisabled = !title.trim() || !date || !time;

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
        Alert.alert('Missing Fields', 'Please fill in all required fields.');
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(date!);
    selected.setHours(0, 0, 0, 0);
    if (selected < today) {
        Alert.alert('Invalid Date', 'Event date cannot be in the past.');
        return;
    }

    const newEvent: Event = {
        id: Date.now().toString(),
        title,
        description,
        status: 'upcoming',
        date: format(date!, 'yyyy-MM-dd'),
        time: format(time!, 'HH:mm'),
    };

    setEvents([...events, newEvent]);

    Alert.alert('Success', 'Event added successfully!');
    router.back();
};


  return (
    <View className="flex-1 bg-yellow-200 content-center px-6 pt-16">
      <Text className="text-gray-800 text-3xl font-bold mb-8 text-center">
        Add New Event
      </Text>

      <TextInput
        className="bg-white rounded-xl p-4 mb-4 text-lg"
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />

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
        <Text
          className={`text-lg ${date ? 'text-gray-700' : 'text-[#C7C7CD]'}`}
        >
          {date ? `📅 ${format(date, 'MMMM dd, yyyy')}` : 'Select Date'}
        </Text>
      </TouchableOpacity>

      {/* Time Picker */}
      <TouchableOpacity
        className="bg-white rounded-xl p-4 mb-4"
        onPress={() => setShowTimePicker(true)}
      >
        <Text
          className={`text-lg ${time ? 'text-gray-700' : 'text-[#C7C7CD]'}`}
        >
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
        minimumDate={new Date()}
        date={new Date(Date.now() + 10 * 60 * 1000)}
      />

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        disabled={isDisabled}
        className={`mt-6 rounded-full py-4 ${
          isDisabled ? 'bg-gray-400' : 'bg-green-500'
        }`}
      >
        <Text className="text-center text-white text-lg font-semibold">
          Save Event
        </Text>
      </TouchableOpacity>

      {/* Back Button */}
        <BackFooter />
    </View>
  );
}
