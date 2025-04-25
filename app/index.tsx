import { Button, Input, Text } from "@rneui/base";
import { Link, useRouter } from "expo-router";
import { View } from "react-native";
import useNavigationExitOnBack from "../hooks/useNavigationExitOnBack";

export default function _screen() {
  useNavigationExitOnBack();

  const router = useRouter();

  const handleLogin = () => {
    console.log("TODO: login user!");
    router.push("/(auth)/(home)/home");
  };

  return (
    <View>
      <Input label="Email" placeholder="email" />
      <Input label="Password" placeholder="password" secureTextEntry />
      <Button title="Login" onPress={handleLogin} />

      <Link href="/register">
        <Text>Create Account</Text>
      </Link>
    </View>
  );
}
