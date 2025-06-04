import { View } from "react-native";
import React from "react";
import { Button } from "@rneui/base";
import UserRepository from "../../src/database/UserRepository";
import FavoriteRepository from "../../src/database/FavoritesRepository";
import useUserStore from "../../states/useUser";

export default function saved() {
  const { getUser } = useUserStore();
  const userId = getUser()?.id.toString();
  const fetchData = async () => {
    console.log("Fetching saved trails...");
    const repository = new FavoriteRepository();
    if (!userId) {
      console.log("User not logged in. Cannot fetch saved trails.");
      return;
    }
    const savedTrails = repository.getSavedTrails(userId);
    console.log(savedTrails);
  };

  return (
    <View>
      <Button onPress={fetchData} title={"Fetch Saved Trails"} />
    </View>
  );
}
