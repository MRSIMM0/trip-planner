import React from "react";

import styles from "./ContextMenu.module.css";
import useContextMenuStore from "@/store/contextMenuStore";
import ContextMenuButton from "./ContextMenuButton/ContextMenuButton";
import useMarkerStore from "@/store/markerStore";
import { v4 as uuidv4 } from 'uuid';
import useDayStore from "@/store/dayStore";
import { useQuerryFeatures } from "../Features/useFeatures";


export default function ContextMenu() {
  const { close, position, coordinates, isMarker } = useContextMenuStore();


  const {addMarkerToDay, removeMarker, activeDayId} = useDayStore();

  const { querryFeatures } = useQuerryFeatures(coordinates);


  const querryData = querryFeatures.data;

  console.log(querryData && querryData.elements.filter((element: any) => element.tags && Object.keys(element.tags).length > 0));


 
  const addMapMarker = () => {
    addMarkerToDay({id: `${coordinates.lat}${coordinates.lng}`, coordinates, dayId: activeDayId})
    close();
  };

  const removeMapMarker = () => {
    removeMarker(`${coordinates.lat}${coordinates.lng}`)
    close();
  };


  return (
    <section
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{ left: position.x, top: position.y }}
      className={styles.pop_up}
    >
      {!isMarker &&<ContextMenuButton onClick={() => addMapMarker()} text="Add Marker" />}
      {isMarker && <ContextMenuButton onClick={() => removeMapMarker()} text="Remove Marker" />}
    </section>
  );
}
