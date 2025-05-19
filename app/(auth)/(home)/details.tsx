import React from "react";
import TrailCardFull from "../../../components/TrailCardFull";
import { useGlobalSearchParams } from "expo-router";

export default function details() {
  const { id } = useGlobalSearchParams();

  return <TrailCardFull id={Number(id)} />;
}
