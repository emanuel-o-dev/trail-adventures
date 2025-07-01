import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Text, Button, Avatar } from "@rneui/base";
import useNavigationExitOnBack from "../../hooks/useNavigationExitOnBack";
import { useRouter } from "expo-router";
import useUser from "../../states/useUser";

export default function _screen() {
  useNavigationExitOnBack();
  const { getUser, reset } = useUser();
  const router = useRouter();

  const user = getUser();

  const handleLogout = () => {
    reset();
    router.push("");
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.subtitle}>
          Por favor, faça login para visualizar seu perfil.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Avatar
          size={100}
          rounded
          title={user.name[0]}
          containerStyle={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <Button
          title="Sair da conta"
          onPress={handleLogout}
          buttonStyle={styles.logoutButton}
          titleStyle={{ fontWeight: "bold" }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181b",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#2563EB",
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "#d1d5db",
    textAlign: "center",
    fontSize: 16,
  },
});
