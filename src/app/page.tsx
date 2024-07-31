'use client'
import { Map } from "@/components/Map/Map";
import styles from "./page.module.css";
import Menu from "@/components/Menu/Menu";
import Seach from "@/components/Map/Search/Search/Search";
import useSearchBarStore from "@/store/searchBarStore";

export default function Home() {
  const { isOpen: isSearchOpen } = useSearchBarStore();
  return (
    <main className={styles.main_wrapper}>
      <Menu />
      <section className={styles.map_wrapper}>
        <Map></Map>
      </section>
      {isSearchOpen && <Seach />}

    </main>
  );
}
