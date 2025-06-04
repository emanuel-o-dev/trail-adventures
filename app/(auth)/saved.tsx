import { FlatList, View } from "react-native";
import React from "react";
import { Button, Text } from "@rneui/base";
import FavoriteRepository from "../../src/database/FavoritesRepository";
import useUserStore from "../../states/useUser";
import TrailCardSaved from "../../components/TrailCardSaved";

export default function saved() {
  function fetchSavedTrails() {
    const { getUser } = useUserStore();
    const repository = new FavoriteRepository();
    const userId = getUser()?.id.toString();
    if (!userId) {
      console.log("Usuario não logado. Não é possível buscar trilhas salvas.");
      return null;
    }
    const savedTrails = repository.getSavedTrails(userId);
    return savedTrails;
  }
  const savedTrails = fetchSavedTrails();
  if (!savedTrails || savedTrails.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text h1 />
        <Text h4>Você não tem trilhas salvas</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={savedTrails}
        keyExtractor={(item) => item.dateVisited?.toString() || ""}
        renderItem={({ item }) => <TrailCardSaved trail={item} />}
      ></FlatList>
    </View>
  );
}
