import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ButtonGroup, Image } from "@rneui/themed";
import { useGlobalSearchParams } from "expo-router";

function handleSaveTrail() {
  // Function to handle saving the trail
  console.log("Trail saved!");
  // Add your logic to save the trail here
  // For example, you could save it to a database or local storage
}
export default function TrailCardFull() {
  const { id } = useGlobalSearchParams();

  const trail = {
    id: id,
    name: "Trail Name",
    description: "Trail Description",
    location: "Trail Location",
    difficulty: "Trail Difficulty",
    distance: "Trail Distance",
    time: "Trail Time",
    type: "Trail Type",
    image: require("../assets/mountain.png"),
  };

  return (
    <View className="flex-1 bg-zinc-900 w-full">
      <Image
        source={trail?.image || require("../assets/mountain.png")}
        style={{ height: 320, width: "100%" }}
        PlaceholderContent={<Text>Loading...</Text>}
      />
      <ScrollView
        className="flex-1 p-8 mt-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="text-white text-3xl font-bold">{trail?.name}</Text>
        <View className="bg-zinc-900 rounded-lg shadow-md">
          <Text className="text-gray-300 text-lg  mt-2">
            Dificuldade: {trail?.difficulty}
          </Text>
          <Text className="text-gray-400 text-lg">
            Tempo estimado: {trail?.time}
          </Text>
          <Text className="text-gray-400 text-lg">
            Percurso: {trail?.distance}
          </Text>
        </View>
        <Text className="text-gray-400 text-lg mt-2">Tipo: {trail?.type}</Text>
        <Text className="text-gray-300 text-lg mt-2">
          Localização: {trail?.location}
        </Text>
        <Text className="text-white mt-2 text-lg">{trail?.description}</Text>

        <View className="flex-auto mt-safe-offset-20">
          <ButtonGroup
            buttons={["Salvar", "Navegar"]}
            containerStyle={{
              height: 50,
              gap: 10,
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            buttonContainerStyle={{
              borderRadius: 10,
              backgroundColor: "#fff",
            }}
            selectedButtonStyle={{
              backgroundColor: "#2563EB",
              borderRadius: 10,
            }}
            selectedIndex={1}
            onPress={(index) => {
              if (index === 0) {
                handleSaveTrail();
              } else if (index === 1) {
                // Handle to rediredect to the map
                console.log("Start trail!");
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
