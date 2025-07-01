import { View } from "react-native";
import React from "react";
import UserRepository from "../../src/database/UserRepository";
import { Button } from "@rneui/base";
import FavoriteRepository from "../../src/database/FavoritesRepository";
import useUserStore from "../../states/useUser";
import TrailRepository from "../../src/database/TrailRepository";

export default function path() {
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
  const fecthDataSaved = async () => {
    const repository = new FavoriteRepository();
    const { getUser } = useUserStore();
    const userId = getUser()?.id;
    console.log("fetch saved");
    if (!userId) {
      console.log("User not logged in. Cannot fetch saved trails.");
      return null;
    }
    const savedTrails = repository.getSavedTrails(userId);
    console.log(savedTrails);
  };
  const deleteDataSaved = async () => {
    console.log("delete saved");
    const repository = new FavoriteRepository();
    const trails = repository.down();
    console.log(trails);
  };
  return (
    <View>
      <Button onPress={fecthData} title={"Test"} />
      <Button onPress={deleteData} title={"Delete"} />
      <Button onPress={fecthDataSaved} title={"Saved now"} />
      <Button onPress={deleteDataSaved} title={"Delete Saved"} />
    </View>
  );
}
