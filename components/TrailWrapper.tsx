import React, { useCallback, useRef, useMemo, useState } from "react";
import { View } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { TrailShort } from "../schemas/TrailShort";
import TrailCardShort from "./TrailCardShort";
import SearchBar from "./SearchBar";

type TrailWrapperProps = {
  trails: Array<TrailShort>;
};

export default function TrailWrapper({ trails }: TrailWrapperProps) {
  const sheetRef = useRef<BottomSheet>(null);
  const [search, setSearch] = useState("");

  const snapPoints = useMemo(() => ["60%", "90%"], []);

  const handleSheetChange = useCallback((index: number) => {
    if (index === -1) {
      sheetRef.current?.close();
      console.log("Bottom sheet closed");
    }
    console.log("handleSheetChange", index);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: TrailShort }) => (
      <View>
        <Link
          href={{
            pathname: "/(auth)/(home)/[id]",
            params: { id: item.id.toString() },
          }}
          asChild
        >
          <TrailCardShort trail={item} />
        </Link>
      </View>
    ),
    [],
  );

  // Filtra as trilhas com base no texto digitado
  const filteredTrails = useMemo(
    () =>
      trails.filter((trail) =>
        trail.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, trails],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      onChange={handleSheetChange}
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
      <SearchBar search={search} setSearch={setSearch} />
      <BottomSheetFlatList
        data={filteredTrails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}
