import { ThemeProvider } from "@rneui/themed";
import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function _layout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ title: "Create Account" }} />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
