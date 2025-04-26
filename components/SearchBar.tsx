import { View } from "react-native";
import React, { useState } from "react";
import { Input } from "@rneui/base";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  return (
    <View className="m-4 flex-row rounded-xl items-center justify-between bg-zinc-800 color-slate-50 gap-4">
      <Input
        placeholder="Explore trilhas"
        onChangeText={(val) => setSearch(val)}
        errorStyle={{ display: "none" }}
        value={search}
        leftIcon={{
          type: "font-awesome",
          name: "search",
          color: "#9EADB8",
          size: 24,
        }}
        className="rounded-lg w-full bg-zinc-800 text-zinc-400"
        importantForAccessibility="yes"
        accessibilityLabel="Search bar"
        accessibilityHint="Type the name of the trail you want to search for"
        accessibilityRole="search"
        accessibilityState={{ disabled: false }}
        accessibilityActions={[{ name: "search", label: "Search" }]}
      />
    </View>
  );
}
