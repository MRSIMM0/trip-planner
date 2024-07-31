import React from 'react'
import styles from './MenuButton.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function MenuButton() {
  return (
    <Link href="#menu"  className={styles.menu_button}>
      <Image src="/menu/menu.svg" alt="" height={20} width={20} />
    </Link>
  )
}
