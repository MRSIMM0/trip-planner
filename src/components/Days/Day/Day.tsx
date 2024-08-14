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

  const { activeDayId, setActiveDay, setVisibleDay, markers } = useDayStore();

  const isOpen = activeDayId === day.id;

  useEffect(() => {
    console.log(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    console.log(markers[day.id]);
  }, [markers[day.id]]);

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
            <Image width={25} height={25} alt='image' src={'/menu/navigate.png'} onClick={() => console.log('remove')} />
          </div>
        ))}
      </section>
    </main>
  );
}
