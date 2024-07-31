import React from 'react'
import styles from './DayList.module.css'
import Day from '../Day/Day'

export default function DayList() {

  const days = ['test', 'test', 'test', 'test', 'test', 'test', 'test']

  return (
    <section className={styles.list}>
      <button className={styles.add}>Add Day</button>

      {days.map(day => (
        <Day key={day.id} />
      ))}
    </section>
  )
}
