import { FlatList, View } from "react-native";
import React, { useEffect } from "react";
import { Text } from "@rneui/base";
import useUserStore from "../../states/useUser";
import useSavedTrails from "../../states/useSavedTrails";
import TrailCardSaved from "../../components/TrailCardSaved";

export default function SavedScreen() {
  const { getUser } = useUserStore();
  const userId = getUser()?.id;
  const { trails, loadTrails } = useSavedTrails();

  useEffect(() => {
    if (userId) {
      loadTrails(userId);
    }
  }, [userId]);

  if (!trails || trails.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text h4>Você não tem trilhas salvas</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={trails}
        keyExtractor={(item) => item.dateVisited}
        renderItem={({ item }) => <TrailCardSaved trail={item} />}
      />
    </View>
  );
}
