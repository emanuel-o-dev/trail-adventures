import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItemAcordion from "../../components/ListItemAccordion";
import InputForm from "../../components/InputForm";
import { ITrailDifficulty } from "../../interfaces/ITrailDifficulty";
import { Button, Icon } from "@rneui/themed";
import TrailRepository from "../../src/database/TrailRepository";
import { ITrailFull } from "../../interfaces/ITrailFull.interface";
import { useState } from "react";
import ImagePickerInput from "../../components/ImagePickerInput";

export default function NewLocation() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");
  const [terrain, setTerrainType] = useState("");
  const [difficulty, setDifficulty] = useState<ITrailDifficulty | null>(null);
  const [imageUri, setImageUri] = useState<string>("");

  const clean = () => {
    setName("");
    setLocation("");
    setDescription("");
    setTerrainType("");
    setDifficulty(null);
    setDuration("");
    setDistance("");
    setImageUri("");
  };
  const handleSubmit = () => {
    if (!name || !location || !description || !terrain || !difficulty) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newTrail: ITrailFull = {
      name,
      location,
      duration,
      distance,
      description,
      terrain,
      difficulty: difficulty.difficulty, // ou difficulty.seq, depende de como vai salvar
      image: imageUri,
    };

    try {
      const repository = new TrailRepository();
      const result = repository.create(newTrail);

      if (result) {
        alert("Trilha cadastrada com sucesso!");
        clean();
      } else {
        alert("Erro ao cadastrar trilha.");
      }
    } catch (error) {
      console.error("Erro ao salvar trilha:", error);
      alert("Erro ao cadastrar trilha.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleWrapper}>
            <Text style={styles.pageTitle}>Cadastrar nova trilha</Text>
            <Icon
              name="close"
              type="material"
              color="white"
              size={30}
              onPress={clean}
            />
          </View>

          <InputForm
            placeholder="Nome da trilha"
            label="Nome da trilha"
            multiline={false}
            value={name}
            onChangeText={setName}
          />
          <InputForm
            placeholder="Localização"
            label="Localização"
            multiline={false}
            value={location}
            onChangeText={setLocation}
          />
          <InputForm
            placeholder="Tipo de terreno"
            label="Tipo de terreno"
            multiline={false}
            value={terrain}
            onChangeText={setTerrainType}
          />
          <View style={styles.accordionWrapper}>
            <ListItemAcordion value={difficulty} onChange={setDifficulty} />
          </View>
          <InputForm
            placeholder="Descrição"
            label="Descrição"
            multiline={true}
            value={description}
            onChangeText={setDescription}
          />
          <InputForm
            placeholder="Duração"
            label="Duração"
            multiline={false}
            value={duration}
            onChangeText={setDuration}
          />
          <InputForm
            placeholder="Tamanho da trilha"
            label="Distância"
            multiline={false}
            value={distance}
            onChangeText={setDistance}
          />

          <ImagePickerInput value={imageUri} onChange={setImageUri} />

          <View style={styles.buttonWrapper}>
            <Button
              title="Cadastrar trilha"
              onPress={handleSubmit}
              color="green"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#121416",
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  accordionWrapper: {
    padding: 10,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  pageTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});
