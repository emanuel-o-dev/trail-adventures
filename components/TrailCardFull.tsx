import { View, Text } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

function handleSaveTrail() {
  // Function to handle saving the trail
  console.log("Trail saved!");
  // Add your logic to save the trail here
  // For example, you could save it to a database or local storage
}
export default function TrailCard() {
  const trail = {
    name: "Trail Name",
    difficulty: "Moderate",
    time: "2 hours",
    distance: "5 miles",
    description:
      "This is a long description of the trail. It includes details about the terrain, scenery, and any other relevant information.",
  };
  return (
    // Card component to display trail information
    <View className="bg-zinc-800 rounded-lg p-4 m-2 shadow-md">
      <Text className="text-white text-lg font-bold">{trail.name}</Text>
      <View className="flex-row justify-between mt-2">
        <Text className="text-gray-500">Dificuldade: {trail.difficulty}</Text>
        <Text className="text-gray-500">Tempo estimado: {trail.time}</Text>
        <Text className="text-gray-500">Percurso: {trail.distance}</Text>
      </View>
      <Text className="text-gray-400">Trail Description</Text>

      <Button title={"Marcar como concluído"} onPress={handleSaveTrail} />
    </View>
  );
}
