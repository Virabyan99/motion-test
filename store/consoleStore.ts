import { create } from "zustand";

type ConsoleLog = {
  id: number;
  message: string;
  type: "log" | "error";
};

type ConsoleState = {
  logs: ConsoleLog[];
  addLog: (message: string, type: "log" | "error") => void;
  clearLogs: () => void;
};

export const useConsoleStore = create<ConsoleState>((set) => ({
  logs: [],
  addLog: (message, type) =>
    set((state) => ({
      logs: [...state.logs, { id: Date.now(), message, type }],
    })),
  clearLogs: () => set({ logs: [] }),
}));