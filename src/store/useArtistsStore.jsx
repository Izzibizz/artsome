import { create } from "zustand";


export const useArtistsStore = create((set) => ({

  bgWhite: false,

  setBgWhite: (input) => set({ bgWhite: input }),

}));
