import React from "react";
import { View } from "react-native";
import { ITrailSaved } from "../interfaces/ITrailSaved";
import { Text } from "@rneui/base";

export default function TrailCardSaved({ trail }: { trail: ITrailSaved }) {
  if (!trail) {
    return <div>No trail history found.</div>;
  }

  return (
    <View style={{ padding: 16, backgroundColor: "#f9f9f9", borderRadius: 8 }}>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{trail.name}</Text>
        <Text style={{ color: "#666" }}>{trail.location}</Text>
        <Text style={{ color: "#999" }}>Visited on: {trail.dateVisited}</Text>
      </View>
    </View>
  );
}
