import React from "react";
import { Tabs } from "expo-router";
import { Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function _layout() {
  const { theme } = useTheme();

  return (
    <SafeAreaProvider>
      <Tabs>
        <Tabs.Screen
          name="(home)"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Icon type="antdesign" name="home" color={theme.colors.primary} />
            ),
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="path"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Icon
                type="material-community"
                name="map-minus"
                color={theme.colors.primary}
              />
            ),
            title: "Map",
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            headerShown: true,
            tabBarIcon: () => (
              <Icon
                type="feather"
                name="bookmark"
                color={theme.colors.primary}
              />
            ),
            title: "Trilhas Salvas",
          }}
        />
        <Tabs.Screen
          name="new-location"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Icon
                type="ionicons"
                name="add-circle-outline"
                color={theme.colors.primary}
              />
            ),
            title: "Add new",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Icon type="antdesign" name="user" color={theme.colors.primary} />
            ),
            title: "Profile",
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
