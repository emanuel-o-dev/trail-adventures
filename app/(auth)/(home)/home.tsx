import React from "react";
import { Text } from "@rneui/base";
import useNavigationExitOnBack from "../../../hooks/useNavigationExitOnBack";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Maps from "../../../components/Maps";
import { ScrollView } from "react-native";
import { Image } from "@rneui/themed";
export default function _screen() {
  useNavigationExitOnBack();

  return (
    <SafeAreaView>
      <Maps />
      <ScrollView
        className="bg-zinc-900 h-full w-full p-4 "
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text className="text-zinc-100">Trilhas proximas</Text>
        <Image
          source={require("../../../assets/montain.png")}
          style={{ height: 320, width: "90%" }}
          className="rounded-lg items-center"
          PlaceholderContent={<Text>Loading...</Text>}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
