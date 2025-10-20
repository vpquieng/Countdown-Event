# Countdown Event App - React Native

## Overview
The **Countdown Event App** is a simple event reminder application built with **React Native (Expo)**, **TypeScript**, and **Jotai** for global state management. Users can add, edit, delete, and cancel events, and receive local notifications before each event happens.

---

## Features
### Core Functionalities
- **Add Events** (with title, date, time, and description)
- **Edit and Delete Events**
- **Cancel Events**
- **Persistent Storage using AsyncStorage**
- **Local Notifications using `expo-notifications`**
- **Event countdown timer**
- **Sorted event listing** (Upcoming, Complete, Canceled)

## Setup Instructions
### 1. Prerequisites
Make sure you have the following installed:
- Node.js (v16 or higher)
- Expo CLI: `npm install -g expo-cli`
- Android Studio or Xcode (optional for device simulators)

### 2. Clone Repository
```bash
git clone https://github.com/vpquieng/Countdown-Event.git
cd countdown-event-app
```
### 3. Install node_modules dependencies
```bash
yarn install
```
### 4. Install required Expo packages
```bash
expo install expo-notifications @react-native-async-storage/async-storage
expo install react-native-safe-area-context react-native-screens
```

## EAS Build Instructions
### 1. Login EAS Account
```bash
eas login
```
### 2. Initialize EAS (only once per project)
```bash
eas build:configure
```
### 3. Run Build for IOS (only for Simulator)
```bash
eas build --platform ios --profile development-simulator 
```
### 4. Run Build for Android
```bash
eas build:run --platform android --profile development 
```

## How to run the app
### Start the Expo development server
```bash
yarn run start
```

## Contributors
- **Vincent Paul Quieng** - Developer 

