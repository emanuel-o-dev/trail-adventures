import { View, Text } from "react-native";
import React from "react";
import { Button } from "@rneui/base";
import TrailRepository from "../../src/database/TrailRepository";

export default function saved() {
  const fecthData = async () => {
    console.log("test");
    const repository = new TrailRepository();
    const trails = repository.all();
    console.log(trails);
  };
  const deleteData = async () => {
    console.log("delete");
    const repository = new TrailRepository();
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
