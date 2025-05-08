import React, { useState } from "react";
import { Input } from "@rneui/themed";
import { View } from "react-native";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  return (
    <View className="m-4 flex-row rounded-xl bg-zinc-800 color-white">
      <Input
        placeholder="Explore trilhas"
        errorStyle={{ display: "none" }}
        onChangeText={(val) => setSearch(val)}
        value={search}
        leftIcon={{
          type: "font-awesome",
          name: "search",
          color: "#9EADB8",
          size: 24,
        }}
        inputStyle={{
          color: "#9EADB8",
          fontSize: 18,
          paddingLeft: 10,
        }}
        importantForAccessibility="yes"
        accessibilityLabel="Search bar"
        accessibilityHint="Type the name of the trail you want to search for"
        accessibilityRole="search"
        accessibilityState={{ checked: false }}
        accessibilityActions={[
          { name: "search", label: "Search" },
          { name: "clear", label: "Clear" },
        ]}
      />
    </View>
  );
}
