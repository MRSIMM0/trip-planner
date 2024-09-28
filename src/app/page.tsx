'use client'
import { Map } from "@/components/Map/Map";
import styles from "./page.module.css";
import Menu from "@/components/Menu/Menu";
import Seach from "@/components/Map/Search/Search/Search";
import useSearchBarStore from "@/store/searchBarStore";
import PdfViewer from "@/components/PdfViewer/PdfViewer";
import usePdfViewerStore from "@/store/pdfViewerStore";

export default function Home() {
  const { isOpen: isSearchOpen } = useSearchBarStore();
  const {isOpen: isPdfViewerOpen} = usePdfViewerStore();
  return (
    <main className={styles.main_wrapper}>
      <Menu />
      <section className={styles.map_wrapper}>
        <Map></Map>
      </section>
      {isSearchOpen && <Seach />}
      {isPdfViewerOpen && <PdfViewer />}
    </main>
  );
}
