import React from 'react'
import styles from './DayList.module.css'
import Day from '../Day/Day'
import useDayStore from '@/store/dayStore'

export default function DayList() {


  const { days, addNewDay } = useDayStore()
  
  const addDay = () => {
    addNewDay()
  }


  return (
    <section className={styles.list}>
      <button onClick={() => addDay()} className={styles.add}>Add Day</button>
      {days.map(day => (
        <Day day={day} key={day.id} />
      ))}
    </section>
  )
}
