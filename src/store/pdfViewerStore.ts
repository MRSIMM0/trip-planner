import { create } from "zustand";

const initialState = {
    isOpen: true,
}

interface PdfViewerStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const usePdfViewerStore = create<PdfViewerStore>((set) => ({
    ...initialState,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}));

export default usePdfViewerStore;