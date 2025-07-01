import { View, Text, Alert } from "react-native";
import React from "react";
import { ExpoLeaflet, MapLayer, MapMarker } from "expo-leaflet";
import { MarkersSchema } from "../schemas/TrailFull";
import { router } from "expo-router";

export default function Maps({ markers }: { markers: MarkersSchema[] }) {
  const mapLayers: MapLayer[] = [
    {
      baseLayerName: "OpenStreetMap",
      baseLayerIsChecked: true,
      layerType: "TileLayer",
      baseLayer: true,
      url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    },
  ];
  return (
    <View className="w-full h-2/5">
      <ExpoLeaflet
        mapLayers={mapLayers}
        mapMarkers={markers.map(
          (marker): MapMarker => ({
            id: marker.id.toString(),
            position: {
              lat: marker.coordinates.latitude,
              lng: marker.coordinates.longitude,
            },
            title: marker.name,
            icon: "<span>📍</span>",
            size: [24, 24],
          }),
        )}
        mapCenterPosition={{
          // Guarapuava
          lat: -25.376432266293175,
          lng: -51.469908922617115,
        }}
        zoom={14}
        onMessage={(message) => {
          if (message.tag == "onMapMarkerClicked") {
            Alert.alert(
              "Marcador Clicado",
              `Gostaria de ver detalhes sobre: ${markers.find((m) => Number(m.id) == Number(message.mapMarkerId))?.name}`,
              [
                {
                  text: "Ver detalhes",
                  onPress: () => {
                    router.navigate({
                      pathname: "/(auth)/(home)/[id]",
                      params: { id: message.mapMarkerId },
                    });
                  },
                },
                { text: "Cancelar", style: "cancel" },
              ],
            );
          }
        }}
      />
    </View>
  );
}
