"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { validateOrDefault } from "@/utils/validate";
import useSearchHandler from "@/hooks/useSearchHandler";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import styles from "./filter-single-selection.module.css";

export default function FilterSingleSelection({
  filter,
  param,
  options,
}: {
  filter: string,
  param: string,
  options: Record<string, string>;
}) {

  const validatedParam = validateOrDefault(param, Object.keys(options), null);

  const searchParams = useSearchParams();
  const { handleSearch } = useSearchHandler();
  
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(validatedParam);

  function handleButton() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function handleButtonSelection(option : string) {

    if (selected === option) {

      handleSearch(searchParams, { [filter]: null });
      setSelected(null);

      return;
    }

    handleSearch(searchParams, { [filter]: option });
    setSelected(option);
  }

  return (
    <div 
      className={styles.filter__selection}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button type="button" className={styles.tag} onClick={handleButton}>
        {selected ? options[selected] : filter}
        <ArrowDropDownIcon fontSize="small" />
      </button>
      {isOpen && (
        <ul className={styles.selection}>
          {Object.entries(options).map(([key, value], index) => (
            <li key={index}>
              <button
                type="button"
                className={`${styles.item} ${selected === key || param === key ? styles.selected : ""}`}
                onClick={() => handleButtonSelection(key)}
              >
                 {selected === key ? <RemoveRoundedIcon fontSize="small" /> : <AddRoundedIcon fontSize="small" />}
                {value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
