// states/useSavedTrails.ts
import { create } from "zustand";
import FavoriteRepository from "../src/database/FavoritesRepository";
import { TrailSaved } from "../schemas/TrailSaved";

interface SavedTrailsState {
  trails: TrailSaved[];
  loadTrails: (userId: number) => void;
  removeTrail: (trailId: number) => void;
  addTrail: (trail: TrailSaved) => void;
}

const useSavedTrails = create<SavedTrailsState>((set) => ({
  trails: [],
  loadTrails: (userId) => {
    const repository = new FavoriteRepository();
    const trails = repository.getSavedTrails(userId);
    set({ trails });
  },
  removeTrail: (trailId) => {
    set((state) => ({
      trails: state.trails.filter((t) => t.id !== trailId),
    }));
  },
  addTrail: (trail) => {
    set((state) => ({
      trails: [...state.trails, trail],
    }));
  },
}));

export default useSavedTrails;
