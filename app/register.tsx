import { Button, Input, Text } from "@rneui/base";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { UserCreate } from "../schemas/User";
import UserRepository from "../src/database/UserRepository";
import useUser from "../states/useUser";

export default function _screen() {
  const router = useRouter();
  const userRepository = new UserRepository();
  const { setUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    const parsed = UserCreate.safeParse({ name, email, password });
    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join("\n");
      Alert.alert("Erro de validação", message);
      return;
    }

    try {
      const existingUser = userRepository.findByEmail(email);
      if (existingUser) {
        Alert.alert("Erro", "Email já cadastrado.");
        return;
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível verificar o email.");
      console.error("Erro ao verificar email:", error);
      return;
    }

    const created = userRepository.create(parsed.data);
    if (created) {
      Alert.alert("Sucesso", "Usuário registrado com sucesso!");
      setUser(created);
      router.push("/(auth)/(home)/home");
    } else {
      Alert.alert("Erro", "Não foi possível registrar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Registrar Usuário
      </Text>

      <Input
        label="Nome"
        placeholder="Fulano Silva"
        placeholderTextColor="#aaa"
        inputStyle={styles.inputText}
        labelStyle={styles.labelText}
        value={name}
        onChangeText={setName}
      />
      <Input
        label="Email"
        placeholder="fulano@example.com"
        placeholderTextColor="#aaa"
        inputStyle={styles.inputText}
        labelStyle={styles.labelText}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        label="Senha"
        placeholder="••••••"
        secureTextEntry
        placeholderTextColor="#aaa"
        inputStyle={styles.inputText}
        labelStyle={styles.labelText}
        value={password}
        onChangeText={setPassword}
      />
      <Input
        label="Confirmar Senha"
        placeholder="••••••"
        secureTextEntry
        placeholderTextColor="#aaa"
        inputStyle={styles.inputText}
        labelStyle={styles.labelText}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button
        title="Registrar"
        onPress={handleRegister}
        buttonStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#121416",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  inputText: {
    color: "#fff",
  },
  labelText: {
    color: "#ccc",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#2563EB", // Azul Tailwind
    marginTop: 16,
    borderRadius: 8,
  },
});
