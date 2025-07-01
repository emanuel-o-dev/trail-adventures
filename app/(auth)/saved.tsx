import { FlatList, View, SafeAreaView, StyleSheet } from "react-native";
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
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Você não tem trilhas salvas.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={trails}
        keyExtractor={(item) => item.dateVisited}
        renderItem={({ item }) => <TrailCardSaved trail={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181b",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#d1d5db", // text-gray-300
  },
});
