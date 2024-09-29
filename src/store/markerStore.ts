import { randomUUID, UUID } from 'crypto';
import {create} from 'zustand';
import { v4 as uuidv4 } from 'uuid';


export interface Marker {
    id: string,
    coordinates: {lat: number, lng: number};
    name?: string;
    dayId?: string;
}

interface MarkerStore {
    markers: Array<Marker>,
    addMarker: (marker: Marker) => void;
    removeMarker: (marker: Marker) => void;
    clearMarkers: () => void;
}

const initalState = {
    markers: [{'id': '19.940809850.0589952', 'coordinates': {'lat': 19.9408098, 'lng': 50.0589952}}, {'id': '19.94075550.059002', 'coordinates': {'lat': 19.940755, 'lng': 50.059002}}, {'id': '19.940415450.0590199', 'coordinates': {'lat': 19.9404154, 'lng': 50.0590199}}, {'id': '19.939726150.0590535', 'coordinates': {'lat': 19.9397261, 'lng': 50.0590535}}, {'id': '19.938705750.0591032', 'coordinates': {'lat': 19.9387057, 'lng': 50.0591032}}, {'id': '19.93855750.0591095', 'coordinates': {'lat': 19.938557, 'lng': 50.0591095}}, {'id': '19.938223350.0591163', 'coordinates': {'lat': 19.9382233, 'lng': 50.0591163}}, {'id': '19.938013450.0591201', 'coordinates': {'lat': 19.9380134, 'lng': 50.0591201}}, {'id': '19.937848950.0591227', 'coordinates': {'lat': 19.9378489, 'lng': 50.0591227}}, {'id': '19.937601650.0591293', 'coordinates': {'lat': 19.9376016, 'lng': 50.0591293}}, {'id': '19.937335450.0591359', 'coordinates': {'lat': 19.9373354, 'lng': 50.0591359}}, {'id': '19.937273250.0591395', 'coordinates': {'lat': 19.9372732, 'lng': 50.0591395}}, {'id': '19.93722350.0591437', 'coordinates': {'lat': 19.937223, 'lng': 50.0591437}}, {'id': '19.937176450.0591493', 'coordinates': {'lat': 19.9371764, 'lng': 50.0591493}}, {'id': '19.937135850.0591553', 'coordinates': {'lat': 19.9371358, 'lng': 50.0591553}}, {'id': '19.937099850.0591617', 'coordinates': {'lat': 19.9370998, 'lng': 50.0591617}}, {'id': '19.93705150.0591715', 'coordinates': {'lat': 19.937051, 'lng': 50.0591715}}, {'id': '19.937009450.0591819', 'coordinates': {'lat': 19.9370094, 'lng': 50.0591819}}, {'id': '19.936968850.0591931', 'coordinates': {'lat': 19.9369688, 'lng': 50.0591931}}, {'id': '19.936927850.0592068', 'coordinates': {'lat': 19.9369278, 'lng': 50.0592068}}, {'id': '19.936882550.0592244', 'coordinates': {'lat': 19.9368825, 'lng': 50.0592244}}, {'id': '19.936843950.0592407', 'coordinates': {'lat': 19.9368439, 'lng': 50.0592407}}, {'id': '19.936808650.0592569', 'coordinates': {'lat': 19.9368086, 'lng': 50.0592569}}, {'id': '19.936605350.0593543', 'coordinates': {'lat': 19.9366053, 'lng': 50.0593543}}, {'id': '19.936584150.059364', 'coordinates': {'lat': 19.9365841, 'lng': 50.059364}}, {'id': '19.936561650.0593733', 'coordinates': {'lat': 19.9365616, 'lng': 50.0593733}}, {'id': '19.936533550.0593841', 'coordinates': {'lat': 19.9365335, 'lng': 50.0593841}}, {'id': '19.936504350.0593946', 'coordinates': {'lat': 19.9365043, 'lng': 50.0593946}}, {'id': '19.936466850.059406', 'coordinates': {'lat': 19.9364668, 'lng': 50.059406}}, {'id': '19.936433350.059416', 'coordinates': {'lat': 19.9364333, 'lng': 50.059416}}, {'id': '19.936399350.0594246', 'coordinates': {'lat': 19.9363993, 'lng': 50.0594246}}, {'id': '19.936359150.0594337', 'coordinates': {'lat': 19.9363591, 'lng': 50.0594337}}, {'id': '19.93631150.0594427', 'coordinates': {'lat': 19.936311, 'lng': 50.0594427}}, {'id': '19.936271450.0594494', 'coordinates': {'lat': 19.9362714, 'lng': 50.0594494}}, {'id': '19.936220950.0594556', 'coordinates': {'lat': 19.9362209, 'lng': 50.0594556}}, {'id': '19.93615450.0594595', 'coordinates': {'lat': 19.936154, 'lng': 50.0594595}}, {'id': '19.936102650.0594616', 'coordinates': {'lat': 19.9361026, 'lng': 50.0594616}}, {'id': '19.936068650.0594623', 'coordinates': {'lat': 19.9360686, 'lng': 50.0594623}}, {'id': '19.936031250.0594612', 'coordinates': {'lat': 19.9360312, 'lng': 50.0594612}}, {'id': '19.935988650.0594591', 'coordinates': {'lat': 19.9359886, 'lng': 50.0594591}}, {'id': '19.935931350.0594556', 'coordinates': {'lat': 19.9359313, 'lng': 50.0594556}}, {'id': '19.935882950.059452', 'coordinates': {'lat': 19.9358829, 'lng': 50.059452}}, {'id': '19.935412650.0594171', 'coordinates': {'lat': 19.9354126, 'lng': 50.0594171}}, {'id': '19.935190450.0594008', 'coordinates': {'lat': 19.9351904, 'lng': 50.0594008}}, {'id': '19.934998150.0593867', 'coordinates': {'lat': 19.9349981, 'lng': 50.0593867}}, {'id': '19.934958450.0593834', 'coordinates': {'lat': 19.9349584, 'lng': 50.0593834}}, {'id': '19.934920350.0593796', 'coordinates': {'lat': 19.9349203, 'lng': 50.0593796}}, {'id': '19.934883650.0593749', 'coordinates': {'lat': 19.9348836, 'lng': 50.0593749}}, {'id': '19.934819550.0593474', 'coordinates': {'lat': 19.9348195, 'lng': 50.0593474}}, {'id': '19.934685450.0592824', 'coordinates': {'lat': 19.9346854, 'lng': 50.0592824}}, {'id': '19.934563350.0592372', 'coordinates': {'lat': 19.9345633, 'lng': 50.0592372}}, {'id': '19.933992650.0590326', 'coordinates': {'lat': 19.9339926, 'lng': 50.0590326}}, {'id': '19.933748750.0589382', 'coordinates': {'lat': 19.9337487, 'lng': 50.0589382}}, {'id': '19.933702850.0589385', 'coordinates': {'lat': 19.9337028, 'lng': 50.0589385}}, {'id': '19.933622350.058939', 'coordinates': {'lat': 19.9336223, 'lng': 50.058939}}, {'id': '19.933554350.0589395', 'coordinates': {'lat': 19.9335543, 'lng': 50.0589395}}, {'id': '19.933499950.0589468', 'coordinates': {'lat': 19.9334999, 'lng': 50.0589468}}, {'id': '19.933459750.0589272', 'coordinates': {'lat': 19.9334597, 'lng': 50.0589272}}, {'id': '19.933340350.0588689', 'coordinates': {'lat': 19.9333403, 'lng': 50.0588689}}, {'id': '19.933242950.0588218', 'coordinates': {'lat': 19.9332429, 'lng': 50.0588218}}, {'id': '19.933201350.0588017', 'coordinates': {'lat': 19.9332013, 'lng': 50.0588017}}, {'id': '19.9330450.0587203', 'coordinates': {'lat': 19.93304, 'lng': 50.0587203}}, {'id': '19.932899250.0586551', 'coordinates': {'lat': 19.9328992, 'lng': 50.0586551}}, {'id': '19.932505550.0584698', 'coordinates': {'lat': 19.9325055, 'lng': 50.0584698}}, {'id': '19.930849250.05771', 'coordinates': {'lat': 19.9308492, 'lng': 50.05771}}, {'id': '19.930717250.0576389', 'coordinates': {'lat': 19.9307172, 'lng': 50.0576389}}, {'id': '19.930358950.0573509', 'coordinates': {'lat': 19.9303589, 'lng': 50.0573509}}, {'id': '19.930343550.0573383', 'coordinates': {'lat': 19.9303435, 'lng': 50.0573383}}, {'id': '19.929837950.056921', 'coordinates': {'lat': 19.9298379, 'lng': 50.056921}}, {'id': '19.929803250.0568927', 'coordinates': {'lat': 19.9298032, 'lng': 50.0568927}}, {'id': '19.92979250.0568834', 'coordinates': {'lat': 19.929792, 'lng': 50.0568834}}, {'id': '19.929537750.0566752', 'coordinates': {'lat': 19.9295377, 'lng': 50.0566752}}, {'id': '19.929360550.0565231', 'coordinates': {'lat': 19.9293605, 'lng': 50.0565231}}, {'id': '19.929251550.0564249', 'coordinates': {'lat': 19.9292515, 'lng': 50.0564249}}, {'id': '19.929042950.0562279', 'coordinates': {'lat': 19.9290429, 'lng': 50.0562279}}, {'id': '19.928978150.056194', 'coordinates': {'lat': 19.9289781, 'lng': 50.056194}}, {'id': '19.92882150.0561118', 'coordinates': {'lat': 19.928821, 'lng': 50.0561118}}, {'id': '19.928779150.0560784', 'coordinates': {'lat': 19.9287791, 'lng': 50.0560784}}, {'id': '19.92839950.0557766', 'coordinates': {'lat': 19.928399, 'lng': 50.0557766}}, {'id': '19.92838750.0557665', 'coordinates': {'lat': 19.928387, 'lng': 50.0557665}}, {'id': '19.928371950.0557545', 'coordinates': {'lat': 19.9283719, 'lng': 50.0557545}}],
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