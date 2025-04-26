import { View } from "react-native";
import React from "react";
import { Text } from "@rneui/base";
import useNavigationExitOnBack from "../../../hooks/useNavigationExitOnBack";
import { Link } from "expo-router";
import SearchBar from "../../../components/SearchBar";
export default function _screen() {
  useNavigationExitOnBack();

  return (
    <View>
      <SearchBar />
      <Text h1>Home</Text>
      <Link href="/(auth)/(home)/details">
        <Text>Details</Text>
      </Link>
    </View>
  );
}
