// states/useTrails.ts
import { create } from "zustand";
import TrailRepository from "../src/database/TrailRepository";
import { TrailFullSchema } from "../schemas/TrailFull";
import { TrailShort } from "../schemas/TrailShort";

interface TrailsState {
  trails: TrailShort[];
  loadTrails: () => void;
  addTrail: (trail: TrailFullSchema) => void;
}

const useTrails = create<TrailsState>((set) => ({
  trails: [],
  loadTrails: () => {
    const repository = new TrailRepository();
    const trails = repository.all();
    set({ trails });
  },
  addTrail: (trail) => {
    set((state) => ({
      trails: [...state.trails, trail as TrailShort],
    }));
  },
}));

export default useTrails;
