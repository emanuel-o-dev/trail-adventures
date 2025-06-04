import { Button, Input, Text } from "@rneui/base";
import { Link, router, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import useNavigationExitOnBack from "../hooks/useNavigationExitOnBack";
import { useState } from "react";
import UserRepository from "../src/database/UserRepository";
import useUserStore from "../states/useUser";

export default function _screen() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const { setUser } = useUserStore();

  const userRepository = new UserRepository();
  useNavigationExitOnBack();

  const handleLogin = () => {
    const user = userRepository.login(email, password);
    console.log(user);
    if (!user) {
      alert("Invalid email or password");
      return;
    } else {
      setUser(user);
      router.push("(auth)/(home)/home");
    }
  };

  return (
    <View style={styles.container}>
      <Text h1 style={styles.h1}>
        Trail Adventures
      </Text>
      <Input
        label="Email"
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        style={styles.input}
      />
      <Input
        label="Password"
        placeholder="senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} style={styles.button} />

      <Link href="/register">
        <Text style={styles.signup}>Registre-se</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#121416",
  },
  input: {
    padding: 16,
    color: "#fff",
  },
  button: {
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  h1: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  signup: {
    marginTop: 16,
    textAlign: "center",
    color: "#fff",
    textDecorationLine: "underline",
  },
});
