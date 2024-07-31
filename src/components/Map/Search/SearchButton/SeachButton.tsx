import React from "react";
import styles from "./SeachButton.module.css";
import Image from "next/image";
import useSearchBarStore from "@/store/searchBarStore";
export default function SeachButton() {
  const { open } = useSearchBarStore();

  return (
    <button onClick={() => open()} className={styles.seach_button}>
      <Image src="/search_icon.svg" alt="" height={30} width={30} />
    </button>
  );
}
