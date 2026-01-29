import { create } from "zustand";
import type { UserRole } from "../lib/mockData";

export type Persona = "Importer" | "Owner";

interface PersonaState {
  persona: Persona;
  setPersona: (persona: Persona) => void;
}

export const usePersonaStore = create<PersonaState>((set) => ({
  persona: "Importer",
  setPersona: (persona) => set({ persona })
}));

