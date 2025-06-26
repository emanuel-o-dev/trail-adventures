// states/useTrails.ts
import { create } from "zustand";
import TrailRepository from "../src/database/TrailRepository";
import { MarkersSchema, TrailFullSchema } from "../schemas/TrailFull";
import { TrailShort } from "../schemas/TrailShort";

interface TrailsState {
  trails: TrailShort[];
  markers: MarkersSchema[];
  loadMarkers: () => void;
  loadTrails: () => void;
  addTrail: () => void;
}

const useTrails = create<TrailsState>((set) => ({
  trails: [],
  markers: [],
  loadTrails: () => {
    const repository = new TrailRepository();
    const trails = repository.all();
    set({ trails });
  },
  loadMarkers: () => {
    const repository = new TrailRepository();
    const markers = repository.allMarkers();
    set({ markers });
  },
  addTrail: () => {
    const repository = new TrailRepository();
    const trails = repository.all();
    set({ trails });
  },
}));

export default useTrails;
