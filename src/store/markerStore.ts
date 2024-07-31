import { randomUUID, UUID } from 'crypto';
import {create} from 'zustand';
import { v4 as uuidv4 } from 'uuid';


export interface Marker {
    id: string,
    coordinates: {lat: number, lng: number};
}

interface MarkerStore {
    markers: Array<Marker>,
    addMarker: (marker: Marker) => void;
    removeMarker: (marker: Marker) => void;
    clearMarkers: () => void;
}

const initalState = {
    markers: [{id: '52.505-0.09' ,coordinates: {lat: 52.505, lng: -0.09}}],
}

const useMarkerStore = create<MarkerStore>((set) => ({
    ...initalState,
    addMarker: (marker: Marker) => set((state) => ({markers: [...state.markers, marker]})),
    removeMarker: (marker: Marker) => set((state) => {
        return ({
            markers: state.markers.filter((m) => m.id !== marker.id)
        });
    }),
    clearMarkers: () => set({markers: []}),
}));

export default useMarkerStore;