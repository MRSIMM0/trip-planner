import {create} from 'zustand';

interface ContextMenuStore {
    isMarker: boolean;
    isOpen: boolean;
    position: {x: number, y: number};
    coordinates: {lat: number, lng: number};
    open: (position: {x: number, y: number}, coordinates: {lat: number, lng: number}, isMarker: boolean) => void;
    close: () => void;
}

const initalState = {
    isMarker: false,
    isOpen: false,
    position: {x: 500, y: 500},
    coordinates: {lat: 0, lng: 0},
}

const useContextMenuStore = create<ContextMenuStore>((set) => ({
    ...initalState,
    open: (position, coordinates, isMarker) => set({isOpen: true, position, coordinates, isMarker}),
    close: () => set({isOpen: false}),
}));

export default useContextMenuStore;