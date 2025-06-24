import {
  View,
  Text,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native";
import React, { forwardRef } from "react";
import { Divider, Image } from "@rneui/themed";
import { TrailShort as TrailShortSchema } from "../schemas/TrailShort";
import { TrailShort } from "../schemas/TrailShort";

type TrailCardShortProps = PressableProps & {
  trail: TrailShort;
};

const TrailCardShort = forwardRef<typeof Pressable, TrailCardShortProps>(
  ({ trail, ...rest }, ref) => {
    const parsed = TrailShortSchema.safeParse(trail);

    if (!parsed.success) {
      console.error("Invalid trail data:", parsed.error.format());
      return null;
    }

    const validTrail = parsed.data;

    return (
      <Pressable
        ref={ref as React.Ref<React.ElementRef<typeof Pressable>>}
        {...rest}
        style={styles.card}
      >
        <Image
          source={{ uri: validTrail.image }}
          style={styles.image}
          PlaceholderContent={<Text>Loading...</Text>}
        />
        <View>
          <Text style={styles.title}>{validTrail.name}</Text>
          <View style={styles.row}>
            <Text style={styles.detailText}>{validTrail.difficulty}</Text>
            <Divider color="white" style={styles.divider} />
            <Text style={styles.subText}>{validTrail.distance}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detailText}>{validTrail.terrain}</Text>
            <Divider color="white" style={styles.divider} />
            <Text style={styles.subText}>{validTrail.duration}</Text>
          </View>
        </View>
      </Pressable>
    );
  },
);

export default TrailCardShort;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#27272a", // bg-zinc-800
    borderRadius: 12, // rounded-lg
    padding: 16, // p-4
    margin: 8, // m-2
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: "flex-start",
    width: "100%",
    gap: 16, // gap-4
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 8,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    alignItems: "center",
  },
  detailText: {
    color: "#f4f4f5", // text-gray-100
  },
  subText: {
    color: "#d4d4d8", // text-gray-300
  },
  divider: {
    width: 12,
    alignSelf: "center",
  },
  errorContainer: {
    padding: 16,
    backgroundColor: "#fecaca", // red-200
    borderRadius: 8,
    margin: 8,
  },
  errorText: {
    color: "#991b1b", // red-800
    fontWeight: "bold",
  },
});
