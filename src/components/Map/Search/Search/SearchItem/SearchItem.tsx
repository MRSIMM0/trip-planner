import React from 'react'
import styles from './SearchItem.module.css'
import useMapStore from '@/store/mapStore';

export interface SearchItem {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    category: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    boundingbox: string[];
  }

interface SearchItemProps {
    item: SearchItem;
  key: number;
}

export default function SearchItem({item, key}: SearchItemProps) {

    const { setCenter, setZoom } = useMapStore();

  return (
    <button tabIndex={0} className={styles.item_button} onClick={() => {setCenter([Number(item.lat), Number(item.lon)]); setZoom(18);}}>
        <p>{item.display_name}</p>
    </button>
  )
}
