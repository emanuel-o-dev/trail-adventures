import { Button, Input } from "@rneui/base";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function _screen() {
  const router = useRouter();

  const handleRegister = () => {
    console.log("TODO: register user!");
    router.push("/(auth)/(home)/home");
  };

  return (
    <View>
      <Input label="Name" placeholder="Fulano Silva" />
      <Input label="Email" placeholder="fulano@example.com" />
      <Input label="Password" placeholder="password" secureTextEntry />
      <Input
        label="Password Confirmation"
        placeholder="password"
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
