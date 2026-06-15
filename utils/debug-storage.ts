import AsyncStorage from "@react-native-async-storage/async-storage";

export async function debugAsyncStorage(label = "ASYNC STORAGE DEBUG") {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);

    console.log(`========== ${label} ==========`);
    console.log("Keys:", keys);

    items.forEach(([key, value]) => {
      console.log(`${key}:`, value ? JSON.parse(value) : value);
    });

    console.log("================================");
  } catch (error) {
    console.log("AsyncStorage Debug Error:", error);
  }
}