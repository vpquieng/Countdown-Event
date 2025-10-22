import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { usersAtom, currentUserAtom, User } from '../atoms/userAtom';

export default function Login() {
  const [users] = useAtom(usersAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginDisable = !email.trim() || !password;

  const handleLogin = () => {
    const existingUser = users.find((u: User) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);

    if (!existingUser) {
      Alert.alert('Login Failed', 'Invalid email or password.');
      return;
    }

    setCurrentUser(existingUser);
    router.replace('/auth');
  };

  return (
    <View className="flex-1 justify-center items-center bg-yellow-200 px-6">
      <Text className="text-3xl font-bold mb-8 text-gray-800">Login</Text>

      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-6"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className={`w-full p-4 rounded-lg items-center ${loginDisable ? 'bg-gray-400' : 'bg-green-500'}`}
        onPress={handleLogin}
        disabled={loginDisable}
      >
        <Text className="text-white font-semibold">Login</Text>
      </TouchableOpacity>

      <Text className="text-center mt-4">
        Don't have an account?{' '}
        <Text className="text-blue-600 font-semibold" onPress={() => router.push('/register')}>
          Register
        </Text>
      </Text>
    </View>
  );
}
