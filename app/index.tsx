import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-950 px-6">
      <Text className="text-center text-3xl font-semibold text-white">
        Tarot App
      </Text>
      <Text className="mt-3 text-center text-base text-neutral-300">
        Offline-first tarot readings for iOS and Android.
      </Text>
    </View>
  );
}
