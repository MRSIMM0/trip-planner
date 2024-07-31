import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import styles from './MenuItem.module.css'

import Text from './Text/Text'

interface MenuItemProps {
    href: string;
    src: string;
    alt: string;
    isActive: boolean;
}

export default function MenuItem({ href, src, alt, isActive }: MenuItemProps) {
  return (
    <Link className={`${styles.item} ${isActive && styles.isActive}`} href={href} >
        <Image src={src} width={32} height={32} alt={alt} />
        <Text>{alt}</Text>
    </Link>
  )
}
