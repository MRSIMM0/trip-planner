import React, { useEffect } from 'react'
import styles from './Day.module.css'
import Image from 'next/image'
import { useDebouncedInput } from '@/hooks/useDebounceInput'
import useDayStore, { Day as DayInterface } from '@/store/dayStore'

interface DayProps {
  day: DayInterface
}

export default function Day({ day }: DayProps) {
  const [debouncedValue, setInputValue, value] = useDebouncedInput(day.title, 300);

  const { activeDayId, setActiveDay, setVisibleDay, markers, removeMarker } = useDayStore();


  function toDMS(deg) {
    var d = Math.floor(deg);
    var min = Math.floor((deg - d) * 60);
    var sec = ((deg - d - min / 60) * 3600).toFixed(2);
    return d + "°" + min + "'" + sec + "\"";
}

function convertLatLngToDMS({lat, lng}) {
    var latDMS = lat >= 0 ? "N" : "S";
    var lngDMS = lng >= 0 ? "E" : "W";

    lat = Math.abs(lat);
    lng = Math.abs(lng);

    var latDMSString = toDMS(lat);
    var lngDMSString = toDMS(lng);

    return latDMSString + " " + latDMS + " " + lngDMSString + " " + lngDMS;
}

  const navigate = (marker) => {
    console.log('navigate', marker);

    const converted = convertLatLngToDMS(marker.coordinates)
    const uri = `https://www.google.com/maps/place/${converted}/@${marker.coordinates.lat},${marker.coordinates.lng},17z`

    window.open(uri, '_blank');

  }

  const isOpen = activeDayId === day.id;

  return (
    <main onClick={() => setActiveDay(day.id)} className={`${styles.day} ${isOpen && styles.active}`}>
      <section className={`${styles.day_header} ${isOpen ? styles.day_header_open : styles.day_header_close}`}>
        <input value={value} onChange={(e) => setInputValue(e.target.value)} className={styles.day_name} type='text' placeholder='Day name' />
        <Image onClick={() => setVisibleDay(day.id, !day.visible)} src={`/content/${day.visible ? 'visible' : 'hidden'}.png`} className={styles.button} alt='day' width={25} height={25} />
      </section>
      <section className={`${isOpen ? styles.content_open : styles.content_close}`}>
        {markers[day.id]?.map((marker, index) => (
          <div className={styles.marker} key={index}>
            <input value={marker.name} onChange={(e) => marker.name=e.target.value} className={styles.marker_input} type='text' placeholder='Marker name' />
            <div className={styles.buttons}>
              <Image className={styles.button} width={20} height={20} alt='image' src={'/menu/navigate.png'} onClick={() => navigate(marker)} />
              <Image className={`${styles.button} ${styles.delete}`} width={20} height={20} alt='image' src={'/menu/trash.svg'} onClick={() => removeMarker(marker.id)} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
