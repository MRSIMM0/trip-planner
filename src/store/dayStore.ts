import {create} from 'zustand';

export interface Day {
    id: string;
    title: string;
    description: string;
    markers: {lat: number, lng: number}[];
}

interface DayStore {
    days: string[];
}

const initalState = {
    days: []
}

const useDayStore = create<DayStore>((set) => ({
    ...initalState,
}));

export default useDayStore;