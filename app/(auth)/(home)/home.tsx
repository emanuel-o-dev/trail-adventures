import { View, StyleSheet } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Text } from "@rneui/base";
import useNavigationExitOnBack from "../../../hooks/useNavigationExitOnBack";
import { Link } from "expo-router";
export default function _screen() {
  useNavigationExitOnBack();

  return (
    <View>
      <Text h1>Home</Text>
      <Link href="/(auth)/(home)/details">
        <Text>Details</Text>
      </Link>
    </View>
  );
}
