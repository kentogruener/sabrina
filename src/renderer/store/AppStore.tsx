import { Register } from 'common/tables';
import { create } from 'zustand';

interface AppState {
  registers: Map<string, Register>;
  addRegister: (register: Register) => void;
  clearAllRegister: () => void;
}

const useAppStore = create<AppState>((set) => ({
  registers: new Map<string, Register>(),
  addRegister: (register: Register) => {
    set((state) => ({
      registers: new Map(state.registers).set(register.uuid, register),
    }));
  },
  clearAllRegister: () => {
    set(() => ({
      registers: new Map<string, Register>(),
    }));
  },
}));

export default useAppStore;
