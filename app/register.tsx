import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { usersAtom, currentUserAtom, User } from '../atoms/userAtom';
import uuid from 'react-native-uuid';
import BackFooter from './components/back-footer';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number

export default function Register() {
  const [users, setUsers] = useAtom(usersAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!name.trim() || !username.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert('Weak Password', 'Password must be at least 8 characters and include at least one number.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    // Ensure email and username are unique
    const existingByEmail = users.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
    if (existingByEmail) {
      Alert.alert('Email Taken', 'An account with that email already exists.');
      return;
    }

    const existingByUsername = users.find((u: User) => u.username.toLowerCase() === username.toLowerCase());
    if (existingByUsername) {
      Alert.alert('Username Taken', 'Please choose a different username.');
      return;
    }

    const newUser: User = {
      id: uuid.v4().toString(),
      name: name.trim(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      events: [],
    };

    const updated = [...users, newUser];
    setUsers(updated);
    setCurrentUser(newUser);
    router.replace('/auth');
  };

  const registerDisable = !name.trim() || !username.trim() || !email.trim() || !password || !confirmPassword;

  return (
    <View className="flex-1 justify-center items-center bg-yellow-200 px-6">
      <Text className="text-3xl font-bold mb-8 text-gray-800">Register Account</Text>

      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-4"
        placeholder="Name"
        value={name}
        onChangeText={(text) =>
          setName(text.charAt(0).toUpperCase() + text.slice(1))
        }
      />

      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-4"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-6"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className={`w-full p-4 rounded-lg items-center ${
          registerDisable ? "bg-gray-400" : "bg-green-500"
        }`}
        onPress={handleRegister}
        disabled={registerDisable}
      >
        
        <Text className="text-white font-semibold">Register</Text>
      </TouchableOpacity>

      <BackFooter />
    </View>
  );
}
