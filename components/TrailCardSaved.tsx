import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ITrailSaved } from "../interfaces/ITrailSaved";
import { Button, Text } from "@rneui/base";
import useUser from "../states/useUser";
import FavoriteRepository from "../src/database/FavoritesRepository";
import useSavedTrails from "../states/useSavedTrails";

export default function TrailCardSaved({ trail }: { trail: ITrailSaved }) {
  const userId = Number(useUser().getUser()?.id);
  const { trails, loadTrails, removeTrail } = useSavedTrails();

  useEffect(() => {
    if (userId) {
      loadTrails(userId);
    }
  }, [userId]);

  const handleDeleteTrail = () => {
    const repository = new FavoriteRepository();
    const result = repository.deleteById({
      trail_id: trail.id,
      user_id: userId,
    });
    if (result) {
      alert("Trilha removida com sucesso!");
      removeTrail(trail.id);
    } else {
      alert("Erro ao remover a trilha. Tente novamente.");
    }
  };
  if (!trail) {
    return <div>No trail history found.</div>;
  }
  if (!userId) {
    return <div>Please log in to manage your trails.</div>;
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{trail.name}</Text>
        <Text style={styles.location}>{trail.location}</Text>
        <Text style={styles.dateVisited}>Visited on: {trail.dateVisited}</Text>
      </View>
      <Button
        onPress={handleDeleteTrail}
        buttonStyle={styles.deleteButton}
        icon={{
          name: "trash",
          type: "font-awesome",
          color: "#fff",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    color: "#666",
  },
  dateVisited: {
    color: "#999",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    marginTop: 8,
  },
});
