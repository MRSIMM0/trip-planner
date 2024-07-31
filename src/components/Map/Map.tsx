"use client";

import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { icon } from "leaflet";

import useContextMenuStore from "@/store/contextMenuStore";
import ContextMenu from "./ContextMenu/ContextMenu";
import useMarkerStore from "@/store/markerStore";
import ContextMenuHandler from "./MapUtils/ContextMenuHandler";
import SeachButton from "./Search/SearchButton/SeachButton";
import Seach from "./Search/Search/Search";
import useSearchBarStore from "@/store/searchBarStore";
import useMapStore from "@/store/mapStore";
import { use, useEffect, useRef } from "react";
import ChangeView from "./MapUtils/ChangeView";

const ICON = icon({
  iconUrl: "/marker.png",
  iconSize: [48, 48],
});

export const Map = () => {
  const { isOpen: isMarkerOpen } = useContextMenuStore();
  const { isOpen: isSearchOpen, open, close } = useSearchBarStore();
  const { open: openContextMenu } = useContextMenuStore();
  const { markers } = useMarkerStore();

  const mapRef = useRef(null);

  const keyDown = (e: any) => {
    if (e.ctrlKey && e.key === 'Alt') {
      open();
    }

    if (e.key === "Escape") {
      close();
    }
  }

  useEffect(() => {
    if(mapRef.current == null) return;
    mapRef.current.addEventListener('keyup', keyDown, false )
  }, [mapRef]);


  const { center, zoom } = useMapStore();

  useEffect(() => {
    console.log(center);
  }, [center]);

  return (
    <main ref={mapRef} className={styles.map}>
      {isMarkerOpen && <ContextMenu />}
      <SeachButton />
      <MapContainer
        attributionControl={false}
        zoomControl={false}
        className={styles.map}
        center={center}
        zoom={zoom}
        scrollWhellZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, i) => (
          <Marker eventHandlers={{
            contextmenu: (e) => {
              openContextMenu({x: e.containerPoint.x, y: e.containerPoint.y}, marker.coordinates, true);
            }
          }} key={marker.id} icon={ICON} position={marker.coordinates}></Marker>
        ))}
        <ContextMenuHandler />
        <ChangeView center={center} zoom={zoom} />
      </MapContainer>
    </main>
  );
};
