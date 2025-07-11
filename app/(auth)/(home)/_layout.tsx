import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalhes da trilha",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
