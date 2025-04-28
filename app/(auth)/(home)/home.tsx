import React from "react";
import useNavigationExitOnBack from "../../../hooks/useNavigationExitOnBack";
import { SafeAreaView } from "react-native-safe-area-context";
import Maps from "../../../components/Maps";
import TrailWrapper from "../../../components/TrailWrapper";
export default function _screen() {
  useNavigationExitOnBack();

  return (
    <SafeAreaView>
      <Maps />
      <TrailWrapper />
    </SafeAreaView>
  );
}
