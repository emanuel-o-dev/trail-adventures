import React from "react";
import useNavigationExitOnBack from "../../../hooks/useNavigationExitOnBack";
import Maps from "../../../components/Maps";
import TrailWrapper from "../../../components/TrailWrapper";
import { View, StyleSheet } from "react-native";
import useTrails from "../../../states/useTrails";
import { useAsyncData } from "../../../hooks/useAsyncData";
import { TrailShort } from "../../../schemas/TrailShort";

export default function _screen() {
  useNavigationExitOnBack();

  const { trails, loadTrails, markers, loadMarkers } = useTrails();
  const { loading } = useAsyncData<{ trails: TrailShort[] }>(async () => {
    loadTrails();
    loadMarkers();
    return { trails };
  });

  if (loading) return loading;

  return (
    <View style={styles.container}>
      <Maps markers={markers} />
      <TrailWrapper trails={trails} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
