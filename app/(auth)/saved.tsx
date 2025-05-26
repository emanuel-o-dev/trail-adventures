import { View, Text } from "react-native";
import React from "react";
import { Button } from "@rneui/base";
import TrailRepository from "../../src/database/TrailRepository";
import UserRepository from "../../src/database/UserRepository";

export default function saved() {
  const fecthData = async () => {
    console.log("test");
    const repository = new UserRepository();
    const trails = repository.all();
    console.log(trails);
  };
  const deleteData = async () => {
    console.log("delete");
    const repository = new UserRepository();
    const trails = repository.down();
    console.log(trails);
  };
  return (
    <View>
      <Button onPress={fecthData} title={"Test"} />
      <Button onPress={deleteData} title={"Delete"} />
    </View>
  );
}
