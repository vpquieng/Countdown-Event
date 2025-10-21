import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { usersAtom, currentUserAtom, User } from '../atoms/userAtom';

export default function Login() {
    const [users,] = useAtom(usersAtom);
    const [, setCurrentUser] = useAtom(currentUserAtom);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
    // Temporary login check until register is done
    const existingUser = users.find(
        (u: User) => u.username === username && u.password === password
    );

    if (!existingUser) {
        Alert.alert('Login Failed', 'Invalid username or password.');
        return;
    }

    setCurrentUser(existingUser);

    // Success -> Go to auth
    router.replace('/auth/index.tsx');
  };

    return (
    <View className="flex-1 justify-center items-center bg-yellow-200 px-6">
      <Text className="text-3xl font-bold mb-8 text-gray-800">Login</Text>
      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-4"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-6"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        className="w-full bg-gray-800 p-4 rounded-lg items-center"
        onPress={handleLogin}
      >
        <Text className="text-white font-semibold">Login</Text>
      </TouchableOpacity>

      <Text className='text-center'>
        Don't have an account? {' '}
        <Text
          className='text-blue-600 font-semibold'
          onPress={() => router.push('/register')}
        >
          Register
        </Text>
      </Text>
    </View>
  );
}   