import React from "react";
import useNavigationExitOnBack from "../../../hooks/useNavigationExitOnBack";
import { SafeAreaView } from "react-native-safe-area-context";
import Maps from "../../../components/Maps";
import TrailWrapper from "../../../components/TrailWrapper";
import { View } from "react-native";
export default function _screen() {
  useNavigationExitOnBack();

  return (
    <View className="flex-1 ">
      <Maps />
      <TrailWrapper />
    </View>
  );
}
