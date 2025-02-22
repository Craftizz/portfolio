"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { validateArrayOrEmpty } from "@/utils/validate";
import useSearchHandler from "@/hooks/useSearchHandler";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

import styles from "./filter-selection.module.css";

export default function FilterMultipleSelection({
  filter,
  param,
  options,
}: {
  filter: string,
  param: string | string[],
  options: Record<string, string>;
}) {
  
  const searchParams = useSearchParams();
  const { handleSearch } = useSearchHandler();
  
  const [isOpen, setIsOpen] = useState(false);
  const selected = useMemo(
    () => validateArrayOrEmpty(param, Object.keys(options)),
    [param]
  );

  function handleButton(): void {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function handleButtonSelection(option: string): void {

    let updatedSelection;

    if (selected.includes(option)) {
        updatedSelection = selected.filter((item) => item !== option);
    } else {
        updatedSelection = [...selected, option];
    }

    handleSearch(searchParams, { [filter]: updatedSelection });
  }

  return (
    <div 
      className={styles.filter__selection}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button type="button" className={styles.tag} onClick={handleButton}>
        {filter} 
        {selected.length > 0 && ` [${selected.length}]`}
        <ArrowDropDownIcon fontSize="small" />
      </button>
      {isOpen && (
        <ul className={styles.selection}>
          {Object.entries(options).map(([key, value], index) => (
            <li key={index}>
              <button
                type="button"
                className={`${styles.item} ${selected.includes(key) ? styles.selected : ''}`}
                onClick={() => handleButtonSelection(key)}
              >
                 {selected.includes(key) ? <CheckBoxRoundedIcon fontSize="small" /> : <CheckBoxOutlineBlankRoundedIcon fontSize="small" />}
                {value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
