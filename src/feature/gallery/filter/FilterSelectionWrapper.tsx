'use client';

import { useState } from "react";
import { ReactNode } from "react";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

import styles from "./filter-layout.module.css";

export default function FilterSelectionWrapper({ 
  children 
}: { 
  children: ReactNode 
}) {

  const [isOpen, setIsOpen] = useState(false);

  function handleButton() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <div className={styles.filter__wrapper}>
      <button className={styles.tag} onClick={handleButton}>
        <TuneRoundedIcon />
      </button>
      <div className={`${styles.filters} ${isOpen ? styles.visible : ''}`}>
        {children}
      </div>
    </div>
  );
}