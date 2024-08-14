import {create} from 'zustand';
import { Marker } from './markerStore';
import { marker } from 'leaflet';

export interface Day {
    id: string;
    title: string;
    description: string;
    visible: boolean;
}

interface DayStore {
    days: Day[];
    activeDayId: string;

    markers: {[key : string]: Marker[]};
    setActiveDay: (dayId: string) => void;
    setVisibleDay: (dayId: string, visible: boolean) => void;
    addNewDay: () => void;
    addMarkerToDay: (marker: Marker) => void;
    removeMarker: (marker: string) => void;
    getVisibleMarkers: () => Marker[];
}

const initalState = {
    days: [{id: '1', title: 'Day 1', description: 'Day 1 description', visible: true, markers: [{id: '1', coordinates: {lat: 52.505, lng: -0.09}, dayId: '1'}]}],
    activeDayId: '1',
    markers: {},
}

const useDayStore = create<DayStore>((set, get) => ({
    ...initalState,
    setVisibleDay: (dayId: string, visible: boolean) => set((state) => {
        const day = state.days.find((d) => d.id === dayId);
        if (day) {
            return {
                ...state,
                days: state.days.map(d => d.id === dayId ? {...d, visible} : d)
            };
        }
        return state;
    }),
    setActiveDay: (dayId: string) => set({activeDayId: dayId}),
    addNewDay: () => set((state) => ({
        days: [...state.days, {id: `${state.days.length + 1}`, visible: true, title: `Day ${state.days.length + 1}`, description: ``, markers: []}]
    })),
    addMarkerToDay: (marker: Marker) => set((state) => {
        const markers = state.markers[state.activeDayId] || [];
        return {
            ...state,
            markers: {
                ...state.markers,
                [state.activeDayId]: [...markers, marker]
            }
        };
    }),
    removeMarker: (markerId: string) => set((state) => {
        const marker = Object.values(state.markers).flatMap((markers) => markers).find((marker) => marker.id === markerId);
        if(!marker) return state;
        const dayId  = marker.dayId;

        if(!dayId) return state;

        if(state.markers[dayId]){
            return {
                ...state,
                markers: {
                    ...state.markers,
                    [dayId]: state.markers[dayId].filter((marker) => marker.id !== markerId)
                }
            };
        }

        return state;
    }),
    getVisibleMarkers: () => {
       return get().days.reduce((acc, day) => {
            if (day.visible) {
                const markers = get().markers[day.id];
                if(!markers) return acc;
                acc.push(...get().markers[day.id]);
            }
            return acc;
        }, []);
    }
}));

export default useDayStore;