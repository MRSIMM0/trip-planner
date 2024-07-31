import {create} from 'zustand';

interface MapStore {
    center: Array<number>;
    zoom: number;
    setCenter: (center: Array<number>) => void;
    setZoom: (zoom: number) => void;
}

const initalState = {
    center: [52.505, -0.09],
    zoom: 13,
}

const useMapStore = create<MapStore>((set) => ({
    ...initalState,
    setCenter: (center: Array<number>) => set({center}),
    setZoom: (zoom: number) => set({zoom}),
}));

export default useMapStore;