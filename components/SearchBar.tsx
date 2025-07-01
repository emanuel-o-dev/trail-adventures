// components/SearchBar.tsx
import React from "react";
import { Input } from "@rneui/themed";
import { View } from "react-native";

type SearchBarProps = {
  search: string;
  setSearch: (val: string) => void;
};

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <View className="m-2 flex-row rounded-xl bg-zinc-800">
      <Input
        placeholder="Explore trilhas"
        errorStyle={{ display: "none" }}
        onChangeText={setSearch}
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
        inputContainerStyle={{
          borderBottomWidth: 0,
        }}
      />
    </View>
  );
}
