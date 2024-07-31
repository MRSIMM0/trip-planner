import React from 'react'
import styles from './Content.module.css'
import Image from 'next/image'
import Link from 'next/link'
import DayList from '@/components/Days/DayList/DayList';
interface ContentProps {
  path: string;
}

export default function Content({path}: ContentProps) {


  const renderContent = (path: string) => {
    switch(path) {

      case "plan":
        return <DayList />;

      default:
         return null;
    
    }}

  return (
    <section className={styles.content}>
      <nav className={styles.navigation}>
        <Link className={styles.close} href={"#"}>
            <Image src={"/menu/close.png"} width={30} height={30} alt={"content"} />
        </Link>
        <Link className={styles.back} href={"#menu"}>
            <Image src={"/menu/back.png"} width={30} height={30} alt={"content"} />
        </Link>
      </nav>
        {renderContent(path)}
    </section>
  )
}
