"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import useSearchHandler from "@/hooks/useSearchHandler";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

import styles from "./filter-single-selection.module.css";
import { validateArrayOrEmpty } from "@/utils/validate";

export default function FilterMultipleSelection({
  filter,
  param,
  options,
}: {
  filter: string,
  param: string | string[],
  options: Record<string, string>;
}) {

  const validatedParam = validateArrayOrEmpty(param, Object.keys(options));

  const searchParams = useSearchParams();
  const { handleSearch } = useSearchHandler();
  
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(validatedParam);

  function handleButton() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function handleButtonSelection(option: string) {

    let updatedSelect;

    if (selected.includes(option)) {
        updatedSelect = selected.filter((item) => item !== option);
    } else {
        updatedSelect = [...selected, option];
    }

    setSelected(updatedSelect);
    handleSearch(searchParams, { [filter]: updatedSelect});
  }

  return (
    <div 
      className={styles.filter__selection}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button type="button" className={styles.tag} onClick={handleButton}>
        {filter}
        <ArrowDropDownIcon fontSize="small" />
      </button>
      {isOpen && (
        <ul className={styles.selection}>
          {Object.entries(options).map(([key, value], index) => (
            <li key={index}>
              <button
                type="button"
                className={`${styles.item} ${selected.includes(key) ? styles.selected : ""}`}
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
