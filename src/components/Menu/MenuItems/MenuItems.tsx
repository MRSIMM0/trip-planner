import React from "react";
import styles from "./MenuItems.module.css";
import MenuItem from "./MenuItem/MenuItem";
import Link from "next/link";
import Image from "next/image";

interface MenuItemsProps {
  path: string;
  isOpen: boolean;
}

export default function MenuItems({ path, isOpen }: MenuItemsProps) {
  return (
    <section className={`${styles.menu_items} ${isOpen ? styles.open : null}`}>
      <MenuItem
        isActive={path === "plan"}
        href={"#plan"}
        src={"/menu/plan.png"}
        alt={"Trip Plan"}
      />
      <MenuItem
        isActive={path === "file"}
        href={"#file"}
        src={"/menu/file.png"}
        alt={"Trip Files"}
      />
      {isOpen ? (
        <Link className={styles.close} href={"#"}>
          <Image
            src={"/menu/close.png"}
            width={30}
            height={30}
            alt={"content"}
          />
        </Link>
      ) : null}
    </section>
  );
}
