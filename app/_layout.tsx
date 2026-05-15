import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Tarot App" }} />
      <Stack.Screen name="onboarding/index" options={{ title: "Onboarding" }} />
      <Stack.Screen name="cards/index" options={{ title: "Cards" }} />
      <Stack.Screen name="cards/[cardId]" options={{ title: "Card" }} />
      <Stack.Screen name="spreads/index" options={{ title: "Spreads" }} />
      <Stack.Screen name="spreads/[spreadId]" options={{ title: "Spread" }} />
      <Stack.Screen name="reading/new" options={{ title: "New Reading" }} />
      <Stack.Screen name="reading/result" options={{ title: "Reading Result" }} />
      <Stack.Screen name="history/index" options={{ title: "History" }} />
      <Stack.Screen name="settings/index" options={{ title: "Settings" }} />
    </Stack>
  );
}
