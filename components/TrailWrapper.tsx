import React, { useCallback, useRef, useMemo } from "react";
import { View } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { Link } from "expo-router";
import { ITrailShort } from "../interfaces/ITrailShort.interface";
import TrailCardShort from "./TrailCardShort";
import { useAsyncData } from "../hooks/useAsyncData";
import TrailRepository from "../src/database/TrailRepository";

export default function TrailWrapper() {
  const sheetRef = useRef<BottomSheet>(null);

  const { trails = [], loading } = useAsyncData<{ trails: ITrailShort[] }>(
    async () => {
      const repository = new TrailRepository();
      const trails = repository.all();
      return { trails };
    },
  );

  const snapPoints = useMemo(() => ["30%", "60%", "90%"], []);

  const handleSheetChange = useCallback((index: number) => {
    if (index === 0) {
      handleClosePress();
    }
    console.log("handleSheetChange", index);
  }, []);

  const handleClosePress = useCallback(() => {
    console.log("close press");
    // você pode fechar o sheet manualmente com: sheetRef.current?.close();
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ITrailShort }) => (
      <View>
        <Link
          href={{
            pathname: "/(auth)/(home)/details",
            params: { id: item.id.toString() }, // garantindo string
          }}
          asChild
        >
          <TrailCardShort trail={item} />
        </Link>
      </View>
    ),
    [],
  );

  if (loading) return loading;

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
        data={trails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}
