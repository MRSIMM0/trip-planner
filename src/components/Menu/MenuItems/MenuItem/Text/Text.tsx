import React from 'react'
import styles from './Text.module.css'

interface TextProps {
    children: string;
}

export default function Text({ children }: TextProps) {
  return (
    <p className={styles.text}>{children}</p>
  )
}
