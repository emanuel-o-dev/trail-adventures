import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function _layout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen
          name="details"
          options={{ title: "Detalhes da trilha" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
