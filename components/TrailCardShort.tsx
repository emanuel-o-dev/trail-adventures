import { View, Text, Pressable, PressableProps } from "react-native";
import React, { forwardRef } from "react";
import { Divider } from "@rneui/themed";
import { Image } from "@rneui/base";
import { ITrailShort } from "../interfaces/ITrailShort.interface";

type TrailCardShortProps = PressableProps & {
  trail: ITrailShort;
};

const TrailCardShort = forwardRef<typeof Pressable, TrailCardShortProps>(
  ({ trail, ...rest }, ref) => {
    return (
      <Pressable
        ref={ref as React.Ref<React.ElementRef<typeof Pressable>>}
        {...rest}
        className="bg-zinc-800 rounded-lg p-4 m-2 gap-4 shadow-md justify-start w-full"
      >
        <Image
          source={trail.image || require("../assets/mountain.png")}
          style={{ height: 200, width: "100%" }}
          PlaceholderContent={<Text>Loading...</Text>}
        />
        <View>
          <Text className="text-white text-lg font-bold">{trail.name}</Text>
          <View className="flex-row gap-3 mt-2">
            <Text className="text-gray-100">{trail.difficulty}</Text>
            <Divider color="white" className="w-3 self-center" />
            <Text className="text-gray-300"> {trail.distance}</Text>
          </View>
          <View className="flex-row gap-3 mt-2">
            <Text className="text-gray-100">{trail.type}</Text>
            <Divider color="white" className="w-3 self-center" />
            <Text className="text-gray-300">{trail.time}</Text>
          </View>
        </View>
      </Pressable>
    );
  },
);

export default TrailCardShort;
