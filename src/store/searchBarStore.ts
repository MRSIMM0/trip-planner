import {create} from 'zustand';

interface SeachBarStore {
    isOpen: boolean;
    open: () => void,
    close: () => void,
}

const initalState = {
    isOpen: false,

}

const useSearchBarStore = create<SeachBarStore>((set) => ({
    ...initalState,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}));

export default useSearchBarStore;