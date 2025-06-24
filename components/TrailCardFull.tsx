import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { ButtonGroup, Image } from "@rneui/themed";
import TrailRepository from "../src/database/TrailRepository";
import { ITrailFull } from "../interfaces/ITrailFull.interface";
import { useAsyncData } from "../hooks/useAsyncData";
import UserRepository from "../src/database/UserRepository";
import useUser from "../states/useUser";
import useSavedTrails from "../states/useSavedTrails";

export default function TrailCardFull({ id }: { id: number }) {
  const { trail, loading } = useAsyncData<{ trail: ITrailFull }>(async () => {
    const repository = new TrailRepository();
    const trail = repository.findById(id);
    return { trail };
  });
  const userId = Number(useUser().getUser()?.id);
  const { loadTrails, addTrail } = useSavedTrails();

  useEffect(() => {
    if (userId) {
      loadTrails(userId);
    }
  }, [userId]);

  const handleSaveTrail = async () => {
    const repository = new UserRepository();
    const saved = repository.saveTrail(userId, Number(trail.id));
    if (saved) {
      addTrail({
        id: Number(trail.id),
        name: trail.name,
        location: trail.location,
        dateVisited: new Date().toISOString(), // ou outro valor que você tiver
      });
      alert("Trilha salva com sucesso!");
    } else {
      alert("Erro ao salvar a trilha. Tente novamente.");
    }
  };
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-zinc-900 items-center justify-center">
        <Text className="text-white">Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      <Image
        source={{ uri: trail?.image }}
        style={{ height: 320, width: "100%" }}
        PlaceholderContent={<Text>Loading...</Text>}
      />
      <ScrollView
        className="flex-1 p-8"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="text-white text-3xl font-bold">{trail?.name}</Text>
        <View className="bg-zinc-900 rounded-lg shadow-md">
          <Text className="text-gray-300 text-lg mt-2">
            Dificuldade: {trail.difficulty}
          </Text>
          <Text className="text-gray-400 text-lg">
            Tempo estimado: {trail.duration}
          </Text>
          <Text className="text-gray-400 text-lg">
            Percurso: {trail.distance}
          </Text>
        </View>
        <Text className="text-gray-400 text-lg mt-2">
          Tipo: {trail.terrain}
        </Text>
        <Text className="text-gray-300 text-lg mt-2">
          Localização: {trail?.location}
        </Text>
        <Text className="text-white mt-2 text-lg">{trail.description}</Text>

        <View className="flex-auto mt-4">
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
                console.log("Start trail!");
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
