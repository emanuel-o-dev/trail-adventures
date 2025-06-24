import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonGroup, Image } from "@rneui/themed";
import TrailRepository from "../src/database/TrailRepository";
import { TrailFull } from "../schemas/TrailFull";
import { useAsyncData } from "../hooks/useAsyncData";
import UserRepository from "../src/database/UserRepository";
import useUser from "../states/useUser";
import useSavedTrails from "../states/useSavedTrails";
import { TrailSaved } from "../schemas/TrailSaved";

export default function TrailCardFull({ id }: { id: number }) {
  const { trail, loading } = useAsyncData<{ trail: any }>(async () => {
    const repository = new TrailRepository();
    const trail = repository.findById(id);
    return { trail };
  });

  const userId = Number(useUser().getUser()?.id);
  const { loadTrails, addTrail } = useSavedTrails();

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userId) {
      loadTrails(userId);
    }
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

    const validTrail = parsed.data;
    const repository = new UserRepository();
    const saved = repository.saveTrail(userId, validTrail.id);

    if (saved) {
      addTrail({
        id: validTrail.id,
        name: validTrail.name,
        location: validTrail.location,
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
        <Text style={styles.loadingText}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: trail?.image }}
        style={{ height: 320, width: "100%" }}
        PlaceholderContent={<Text>Loading...</Text>}
      />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.title}>{trail?.name}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Dificuldade: {trail.difficultyLabel}
          </Text>

          <Text style={styles.infoText}>Tempo estimado: {trail.duration}</Text>
          <Text style={styles.infoText}>Percurso: {trail.distance}</Text>
        </View>

        <Text style={styles.detail}>Tipo: {trail.terrain}</Text>
        <Text style={styles.detail}>Localização: {trail?.location}</Text>
        <Text style={styles.description}>{trail.description}</Text>

        <View style={styles.buttonGroup}>
          <ButtonGroup
            buttons={["Salvar", "Navegar"]}
            containerStyle={styles.buttonGroupContainer}
            buttonContainerStyle={styles.buttonContainer}
            selectedButtonStyle={styles.selectedButton}
            selectedIndex={1}
            onPress={(index) => {
              if (index === 0) {
                handleSaveTrail();
              } else if (index === 1) {
                console.log("Start trail!");
              }
            }}
            disabled={saving}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181b", // bg-zinc-900
  },
  centered: {
    flex: 1,
    backgroundColor: "#18181b",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: "#18181b",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  infoText: {
    color: "#d1d5db", // text-gray-300
    fontSize: 16,
    marginBottom: 4,
  },
  detail: {
    color: "#9ca3af", // text-gray-400
    fontSize: 16,
    marginTop: 8,
  },
  description: {
    color: "#fff",
    marginTop: 8,
    fontSize: 16,
  },
  buttonGroup: {
    marginTop: 16,
  },
  buttonGroupContainer: {
    height: 50,
    backgroundColor: "transparent",
    borderColor: "transparent",
    gap: 10,
  },
  buttonContainer: {
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  selectedButton: {
    backgroundColor: "#2563EB", // azul
    borderRadius: 10,
  },
});
