import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import * as Linking from "expo-linking";

import React, { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import TrailRepository from "../src/database/TrailRepository";
import { TrailFullSchema } from "../schemas/TrailFull";
import { useAsyncData } from "../hooks/useAsyncData";
import UserRepository from "../src/database/UserRepository";
import useUser from "../states/useUser";
import useSavedTrails from "../states/useSavedTrails";
import { TrailSaved } from "../schemas/TrailSaved";
import { Image } from "@rneui/base";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TrailCardFull({ id }: { id: number }) {
  const { trail, loading } = useAsyncData<{ trail: TrailFullSchema }>(
    async () => {
      const repository = new TrailRepository();
      const trail = repository.findById(id);
      return { trail };
    },
  );

  const userId = Number(useUser().getUser()?.id);
  const { loadTrails, addTrail } = useSavedTrails();
  const [saving, setSaving] = useState(false);

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trail.name)}`;

    Linking.openURL(url);
  };

  useEffect(() => {
    if (userId) loadTrails(userId);
  }, [userId]);

  const handleSaveTrail = async () => {
    if (!trail || !trail.id || saving) return;

    setSaving(true);

    const parsed = TrailSaved.safeParse(trail);
    if (!parsed.success) {
      ToastAndroid.show("Erro: dados da trilha inválidos.", ToastAndroid.SHORT);
      console.error("Zod error:", parsed.error);
      setSaving(false);
      return;
    }

    const repository = new UserRepository();
    const saved = repository.saveTrail(userId, trail.id);

    if (saved) {
      addTrail({
        id: trail.id,
        name: trail.name,
        location: trail.location,
        dateVisited: new Date().toISOString(),
      });
      ToastAndroid.show("Trilha salva com sucesso!", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Erro ao salvar a trilha.", ToastAndroid.SHORT);
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Carregando trilha...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: trail.image }}
        style={{ height: 320, width: "100%" }}
        PlaceholderContent={<ActivityIndicator color="#fff" />}
        resizeMode="cover"
      />

      <View style={styles.scroll}>
        <Text style={styles.title}>{trail.name}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Dificuldade: {trail.difficultyLabel}
          </Text>
          <Text style={styles.infoText}>Tempo estimado: {trail.duration}</Text>
          <Text style={styles.infoText}>Percurso: {trail.distance}</Text>
        </View>

        <Text style={styles.detail}>Tipo: {trail.terrain}</Text>
        <Text style={styles.detail}>Localização: {trail.location}</Text>
        <Text style={styles.description}>{trail.description}</Text>

        <View style={styles.actions}>
          <Button
            title="Salvar Trilha"
            loading={saving}
            onPress={handleSaveTrail}
            buttonStyle={styles.saveButton}
            titleStyle={{ fontWeight: "bold" }}
          />
          <Button
            title="Navegar no Google Maps"
            onPress={handleNavigate}
            buttonStyle={{ backgroundColor: "#10b981", borderRadius: 10 }}
            containerStyle={{ marginTop: 10 }}
            icon={{
              name: "map-marker",
              type: "font-awesome",
              color: "white",
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181b",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#18181b",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
  },
  scroll: {
    flex: 1,
    padding: 12,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: "#1f2937",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  infoText: {
    color: "#d1d5db",
    fontSize: 16,
    marginBottom: 4,
  },
  detail: {
    color: "#9ca3af",
    fontSize: 16,
    marginTop: 8,
  },
  description: {
    color: "#fff",
    marginTop: 8,
    fontSize: 16,
  },
  actions: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 12,
  },
});
