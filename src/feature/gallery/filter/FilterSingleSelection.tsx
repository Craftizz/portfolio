"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { validateOrDefault } from "@/utils/validate";
import useSearchHandler from "@/hooks/useSearchHandler";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import styles from "./filter-selection.module.css";

export default function FilterSingleSelection({
  filter,
  param,
  options,
}: {
  filter: string,
  param: string,
  options: Record<string, string>;
}) {

  const searchParams = useSearchParams();
  const { handleSearch } = useSearchHandler();
  const [isOpen, setIsOpen] = useState(false);

  const selected = useMemo(
    () => validateOrDefault(param, Object.keys(options), null),
    [param]
  );

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
      return;
    }

    handleSearch(searchParams, { [filter]: option });
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
