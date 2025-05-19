import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  value: string;
  onChange: (uri: string) => void;
};

export default function ImagePickerInput({ value, onChange }: Props) {
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a galeria negada.");
      return;
    }

    setLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setLoading(false);

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        marginVertical: 20,
        padding: 10,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
        Selecione uma imagem
      </Text>
      {value ? (
        <Image
          source={{ uri: value }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
        />
      ) : (
        <Text style={{ color: "white" }}>Nenhuma imagem selecionada</Text>
      )}

      <TouchableOpacity onPress={pickImage} style={{ marginTop: 10 }}>
        <Text style={{ color: "lightblue" }}>
          {loading ? "Carregando..." : "Selecionar imagem"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
