import { Button, Input, Text } from "@rneui/base";
import { Link, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import useNavigationExitOnBack from "../hooks/useNavigationExitOnBack";
import { useState } from "react";
import UserRepository from "../src/database/UserRepository";
import useUserStore from "../states/useUser";
import { UserLogin } from "../schemas/User";

export default function _screen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useUserStore();

  const userRepository = new UserRepository();
  useNavigationExitOnBack();

  const handleLogin = () => {
    const parsed = UserLogin.safeParse({ email, password });

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join("\n");
      alert("Erros de validação:\n" + message);
      return;
    }

    const user = userRepository.login(email, password);
    if (!user) {
      alert("Email ou senha inválidos.");
      return;
    }

    setUser(user);
    router.navigate("(auth)/(home)/home");
  };

  return (
    <View style={styles.container}>
      <Text h2 style={styles.title}>
        Trail Adventures
      </Text>

      <Input
        label="Email"
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        inputStyle={styles.inputText}
        labelStyle={styles.label}
        placeholderTextColor="#9ca3af"
        inputContainerStyle={styles.inputContainer}
      />

      <Input
        label="Senha"
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        inputStyle={styles.inputText}
        labelStyle={styles.label}
        placeholderTextColor="#9ca3af"
        inputContainerStyle={styles.inputContainer}
      />

      <Button
        title="Entrar"
        onPress={handleLogin}
        buttonStyle={styles.button}
        titleStyle={{ fontWeight: "bold", fontSize: 16 }}
      />

      <Link href="/register" style={styles.signup}>
        <Text style={styles.signup}>Não tem uma conta? Registre-se</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121416",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 32,
    fontWeight: "bold",
  },
  inputText: {
    color: "#fff",
    fontSize: 16,
  },
  label: {
    color: "#d1d5db",
    marginBottom: 4,
  },
  inputContainer: {
    borderBottomColor: "#3f3f46",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  signup: {
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 24,
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
