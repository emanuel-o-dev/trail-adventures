import { View, Text } from "react-native";
import React from "react";
import { Image } from "@rneui/themed";
import SearchBar from "./SearchBar";

export default function Maps() {
  return (
    <View className="w-full relative">
      <Image
        source={require("../assets/maps.png")}
        style={{ height: 320, width: "100%" }}
        PlaceholderContent={<Text>Loading...</Text>}
      />
      <View className="absolute top-0 left-0 right-0 bottom-0 ">
        <SearchBar />
      </View>
    </View>
  );
}
