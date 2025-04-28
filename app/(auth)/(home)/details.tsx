import { Text, View } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { useFetchTrailDetails } from "../../../hooks/useFecthTrailDetails";

export default function details() {
  const { id } = useGlobalSearchParams();
  const { trail } = useFetchTrailDetails(id as string);

  return (
    <View className="flex-1 bg-zinc-800 p-4 justify-center items-center">
      <View className="flex-1 bg-zinc-800 p-4">
        <View className="bg-zinc-900 rounded-lg p-4 shadow-md">
          <Text className="text-white text-lg font-bold">{trail?.name}</Text>
          <View className="flex-row justify-between mt-2">
            <Text className="text-gray-500">
              Dificuldade: {trail?.difficulty}
            </Text>
            <Text className="text-gray-500">Tempo estimado: {trail?.time}</Text>
            <Text className="text-gray-500">Percurso: {trail?.distance}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
