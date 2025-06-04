import { View } from "react-native";
import React from "react";
import UserRepository from "../../src/database/UserRepository";
import { Button } from "@rneui/base";

export default function path() {
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
