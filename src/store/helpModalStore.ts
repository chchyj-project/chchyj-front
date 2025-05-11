import { create } from 'zustand';

interface HelpModalStore {
  isOpen: boolean;
  openHelpModal: () => void;
  closeHelpModal: () => void;
}

export const useHelpModalStore = create<HelpModalStore>((set) => ({
  isOpen: false,
  openHelpModal: () => set({ isOpen: true }),
  closeHelpModal: () => set({ isOpen: false }),
}));
