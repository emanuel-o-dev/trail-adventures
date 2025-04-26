import { View, Text } from "react-native";
import React from "react";
import { Image } from "@rneui/themed";
import SearchBar from "./SearchBar";

export default function Maps() {
  return (
    <View>
      <Image
        source={require("../assets/maps.png")}
        resizeMode="cover"
        className="w-50"
      />
      <SearchBar />
    </View>
  );
}
