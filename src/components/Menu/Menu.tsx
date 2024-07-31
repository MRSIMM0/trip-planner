import React, { useEffect, useState } from 'react'
import styles from './Menu.module.css'
import MenuItems from './MenuItems/MenuItems';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Content from './Content/Content';
import Seach from '../../components/Map/Search/Search/Search';
import useSearchBarStore from '@/store/searchBarStore';
import MenuButton from './MenuButton/MenuButton';

export default function Menu() {
    const router = useRouter();
    const params = useParams();

    const [openItem, setOpenItem] = useState<string>('');

    const isOpen = openItem !== '' && openItem !== 'menu';

  
    useEffect(() => {
        setOpenItem(window.location.hash.split('#').pop() || '');
    }, [params]);
  

    useEffect(() => {
        if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
            router.push('/');
        }
    }, []);



  return (
    <>
    <section className={`${styles.menu} ${isOpen ? styles.open : styles.close}`}>
        <MenuItems isOpen={openItem === 'menu'} path={openItem} />
        <Content path={openItem}/>
    </section>
    <MenuButton />
    </>
  )
}


