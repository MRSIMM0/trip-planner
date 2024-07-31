import React from "react";
import { useMap, useMapEvents } from "react-leaflet";
import useContextMenuStore from "@/store/contextMenuStore";

interface MapClickProps {
  // center: [number, number]
}

const buttonOffset = 5;

export default function ContextMenuHandler({}: MapClickProps) {
  const { open, close } = useContextMenuStore();

  const map = useMap();

  let menuOpenedAt = 0;
  const menuCloseDelay = 300;
  let canCloseMenu = false;

  map.on("contextmenu", (e) => {

    const isMarker = e.originalEvent.target.nodeName === 'IMG'
    
    const { x, y } = e.containerPoint;
    open({ x: x + buttonOffset, y: y + buttonOffset }, e.latlng, isMarker);
    menuOpenedAt = Date.now();
    canCloseMenu = false;
    setTimeout(() => {
      canCloseMenu = true;
    }, menuCloseDelay);
  });

  map.on("zoom", () => {
    if (canCloseMenu) {
      close();
    }
  });

  map.on("click", () => {
    if (canCloseMenu) {
      close();
    } else {
      setTimeout(() => {
        canCloseMenu = true;
      }, menuCloseDelay);
    }
  });

  map.on("move", (e) => {
    if (canCloseMenu) {
      close();
    }
  });

  return null;
}
