import { View, Text, Pressable } from "react-native";
import React from "react";
import { Divider } from "@rneui/base";
import { Image } from "@rneui/themed";
import { ITrailShort } from "../interfaces/ITrailShort.interface";

export default function TrailCardShort(
  trail: ITrailShort & { onPress: () => void },
) {
  return (
    <Pressable
      onPress={trail.onPress}
      className="bg-zinc-800 rounded-lg p-4 m-2 gap-4 shadow-md justify-start"
    >
      <Image
        source={trail.image || require("../assets/mountain.png")}
        style={{ height: 200, width: "100%" }}
        PlaceholderContent={<Text>Loading...</Text>}
      />
      <View>
        <Text className="text-white text-lg font-bold">{trail.name}</Text>
        <View className="flex-row gap-3 mt-2">
          <Text className="text-gray-400"> {trail.difficulty}</Text>
          <Divider orientation="vertical" width={1} color="#fff" />
          <Text className="text-gray-400"> {trail.distance}</Text>
        </View>
        <View className="flex-row gap-3 mt-2">
          <Text className="text-gray-400">{trail.type}</Text>
          <Divider
            orientation="vertical"
            width={1}
            className="h-1"
            color="#fff"
          />

          <Text className="text-gray-400">{trail.time}</Text>
        </View>
      </View>
    </Pressable>
  );
}
