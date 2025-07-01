import { View, StyleSheet } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Button, Text } from "@rneui/base";
import useNavigationExitOnBack from "../../hooks/useNavigationExitOnBack";
import { useRouter } from "expo-router";
import useUser from "../../states/useUser";

const user = {
  name: "Fulano Silva",
  email: "test@test.com",
};

export default function _screen() {
  useNavigationExitOnBack();
  const { getUser, reset } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    reset();
    router.push("");
  };
  const user = getUser();
  if (!user) {
    return (
      <View>
        <Text h1>Profile</Text>
        <Text>Please log in to see your profile.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text h1>Profile</Text>

      <Text>{user.name}</Text>
      <Text>{user.email}</Text>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
