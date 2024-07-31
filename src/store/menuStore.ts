import {create} from 'zustand';

interface MenuStore {
    isOpen: boolean;
    open: () => void,
    close: () => void,
}

const initalState = {
    isOpen: false,
}

const useMenuStore = create<MenuStore>((set) => ({
    ...initalState,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}));

export default useMenuStore;