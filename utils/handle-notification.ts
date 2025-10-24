import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Event } from '../atoms/eventAtom';

export const eventNotificationMap: Record<string, string[]> = {};

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowList: true,
  }),
});

// Request notification permission
export const requestNotificationPermission = async () => {
  // Check current permission first
  let settings = await Notifications.getPermissionsAsync();
  // If not granted, request permission
  if (!settings.granted) {
    settings = await Notifications.requestPermissionsAsync();
  }
  // Return permission result
  return settings.granted;
};


// Schedule event notifications
export const scheduleEventNotification = async (event: Event) => {
  if (!event?.id || !event.date || !event.time) return;

  const eventDateTime = new Date(`${event.date}T${event.time}`);
  const now = new Date();

  // ⛔ Prevent duplicate alarms
  if (eventNotificationMap[event.id]) {
    for (const notifId of eventNotificationMap[event.id]) {
      await Notifications.cancelScheduledNotificationAsync(notifId);
    }
  }
  eventNotificationMap[event.id] = [];

  // Reminder notifications
  const reminders = [
    { minutes: 60, message: `Reminder: "${event.title}" starts in 1 hour.` },
    { minutes: 30, message: `Reminder: "${event.title}" starts in 30 minutes.` },
    { minutes: 10, message: `Reminder: "${event.title}" starts in 10 minutes.` },
  ];

  for (const reminder of reminders) {
    const reminderTime = new Date(eventDateTime.getTime() - reminder.minutes * 60000);
    if (reminderTime > now) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Event Reminder',
          body: reminder.message,
          sound: true,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: reminderTime,
          channelId: Platform.OS === 'android' ? 'event-reminders' : undefined,
        },
      });
      eventNotificationMap[event.id].push(id);
    }
  }

  // Final "Event Complete" alert
  if (eventDateTime > now) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Event Complete 🎉',
        body: `Your event "${event.title}" is now complete!`,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: eventDateTime,
        channelId: Platform.OS === 'android' ? 'event-reminders' : undefined,
      },
    });
    eventNotificationMap[event.id].push(id);
  }
};

export const setupNotificationChannel = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('event-reminders', {
      name: 'Event Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
    });
  }
};
