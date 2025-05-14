import React, { useCallback, useRef, useMemo, useState } from "react";
import { View } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import TrailCardShort from "./TrailCardShort";
import { Link, useRouter } from "expo-router";
import { ITrailShort } from "../interfaces/ITrailShort.interface";
import { useFetchTrailList } from "../hooks/useFetchTrailList";
import { trailsMock } from "../mocks/trailShort";
// import { useSQLitePopulate } from "../hooks/useSQLitePopulate";

export default function TrailWrapper() {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);
  // useSQLitePopulate();
  const { trailList } = useFetchTrailList();
  console.log(trailList);

  const snapPoints = useMemo(() => ["30%", "60%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    if (index === 0) {
      handleClosePress();
    }
    console.log("handleSheetChange", index);
  }, []);

  const handleClosePress = useCallback(() => {
    console.log("close press");
  }, []);
  const router = useRouter();

  // render
  const renderItem = useCallback(
    ({ item }: { item: ITrailShort }) => (
      <View>
        <Link
          href={{
            pathname: "/(auth)/(home)/details",
            params: { id: item.id },
          }}
          asChild
        >
          <TrailCardShort trail={item} />
        </Link>
      </View>
    ),
    [router],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      onChange={handleSheetChange}
      detached={false}
      onClose={handleClosePress}
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
        data={trailsMock}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}
