import React from 'react'
import styles from './Day.module.css'
import Image from 'next/image'

export default function Day() {

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <main className={styles.day}>
      <section className={`${styles.day_header} ${isOpen ? styles.day_header_open : styles.day_header_close}`}>
      <input className={styles.day_name} type='text' placeholder='Day name' />
      <Image onClick={() => setIsOpen((prev) => !prev)} className={`${styles.button} ${isOpen ? styles.close : styles.expand}`} width={20} height={20} src="/content/expand.png" alt='expand'/>
      </section>
      <section className={`${isOpen ? styles.content_open : styles.content_close}`}>
        test
      </section>
    </main>
  )
}
