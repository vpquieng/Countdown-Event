import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { usersAtom, currentUserAtom, User } from '../atoms/userAtom';
import uuid from 'react-native-uuid';
import BackFooter from './components/back-footer';


export default function Register() {
    const [users, setUsers] = useAtom(usersAtom);
    const [, setCurrentUser] = useAtom(currentUserAtom);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (!username.trim() || !name || !password || !confirmPassword) {
            Alert.alert('Missing Fields', 'Please fill in all required fields.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Passwords do not match.');
            return;
        }

        const existingUser = users.find((u: User) => u.username === username);
        if (existingUser) {
            Alert.alert('Username Taken', 'Please choose a different username.');
            return;
        }

        const newUser: User = {
            id: uuid.v4().toString(),
            email,
            username,
            name,
            password,
            events: [],
        };

        setUsers([...users, newUser]);
        setCurrentUser(newUser);

        router.replace('/auth/index.tsx');
    };

    return (
        <View className="flex-1 justify-center items-center bg-yellow-200 px-6">
            <Text className="text-3xl font-bold mb-8 text-gray-800">Register</Text>
            <TextInput
                className="w-full bg-white p-4 rounded-lg mb-4"
                placeholder="Name"
                value={name}
                onChangeText={setName}
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
                keyboardType="email-address"
                autoCapitalize="none"
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
                className="w-full bg-gray-800 p-4 rounded-lg items-center"
                onPress={handleRegister}
            >
                <Text className="text-white font-semibold">Register</Text>
            </TouchableOpacity>
            <BackFooter />
        </View>
    );
}

