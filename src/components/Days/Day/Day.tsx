import React from 'react'
import styles from './Day.module.css'
import Image from 'next/image'

export default function Day() {
  return (
    <section className={styles.day}>Day
    <Image width={20} height={20} src="/content/expand.png" alt='expand'/>
    </section>
  )
}
