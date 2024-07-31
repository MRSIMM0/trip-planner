import React from "react";
import styles from "./ContextMenuButton.module.css";

interface ContextMenuButtonProps {
  onClick?: () => void;
  text?: string;
}

export default function ContextMenuButton({
  onClick,
  text,
}: ContextMenuButtonProps) {
  return (
    <button
      className={styles.context_menu_button}
      onClick={() => onClick && onClick()}
    >
      {text}
    </button>
  );
}
