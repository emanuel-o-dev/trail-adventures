import React, { useCallback, useRef, useMemo, Children } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import TrailCardShort from "./TrailCardShort";
import { trailsMock } from "../mocks/trailShort";
import { Link, useRouter } from "expo-router";

export default function TrailWrapper() {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["60%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index: any) => {
    console.log("handleSheetChange", index);
  }, []);
  const router = useRouter();

  // render
  const renderItem = useCallback(
    ({ index }: { index: number }) => {
      return (
        <View className="bg-transparent">
          <Link
            href={{
              pathname: "/(auth)/(home)/details",
              params: { id: trailsMock[index].id },
            }}
            asChild
          >
            <TrailCardShort
              {...trailsMock[index]}
              onPress={() => router.navigate("/(auth)/(home)/details")}
            />
          </Link>
        </View>
      );
    },
    [trailsMock],
  );

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        detached={true}
        handleIndicatorStyle={{
          backgroundColor: "#fff",
          width: 50,
        }}
        handleStyle={{
          backgroundColor: "#121416",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: 30,
          justifyContent: "center",
        }}
        backgroundStyle={{
          backgroundColor: "#121416",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <BottomSheetFlatList
          data={trailsMock.map((trail) => trail.name)}
          keyExtractor={(i) => i}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: "#121417",
          }}
        />
      </BottomSheet>
    </View>
  );
}
