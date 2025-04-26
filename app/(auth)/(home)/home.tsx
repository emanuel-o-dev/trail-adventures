import React from "react";
import { Text } from "@rneui/base";
import useNavigationExitOnBack from "../../../hooks/useNavigationExitOnBack";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Maps from "../../../components/Maps";
export default function _screen() {
  useNavigationExitOnBack();

  return (
    <SafeAreaView>
      <Maps />
      <Text h1>Home</Text>
      <Link href="/(auth)/(home)/details">
        <Text>Details</Text>
      </Link>
    </SafeAreaView>
  );
}
