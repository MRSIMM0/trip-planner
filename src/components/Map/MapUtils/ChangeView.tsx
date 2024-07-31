import useMapStore from '@/store/mapStore';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface ChangeViewProps {
    center: [number, number];
    zoom: number;
}

export default function ChangeView({ center, zoom}: ChangeViewProps) {
    const map = useMap();
    const { setCenter, setZoom } = useMapStore();

    useEffect(() => {
        map.flyTo(center, zoom);
    }, [center, zoom, map]);

    useEffect(() => {
        const updateCenter = () => {
            const newCenter = map.getCenter();
            setCenter([newCenter.lat, newCenter.lng]);
        };

        const updateZoom = () => {
            const newZoom = map.getZoom();
            setZoom(newZoom);
        };

        map.on('dragend', updateCenter);
        map.on('zoomend', updateZoom);

        return () => {
            map.off('dragend', updateCenter);
            map.off('zoomend', updateZoom);
        };
    }, [map]);

    return null;
}