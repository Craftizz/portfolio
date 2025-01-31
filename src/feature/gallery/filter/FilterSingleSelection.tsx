"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import styles from "./filter-single-selection.module.css";
import { validateOrDefault } from "@/utils/validate";

export default function FilterSingleSelection({
  category,
  options,
}: {
  category: string
  options: string[];
}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  function handleButton() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function handleButtonSelection(option : string) {

    if (selected === option) {

      handleSearch("category");
      setSelected(null);
      return;
    }

    handleSearch("category", option);
    setSelected(option);
  }

  function handleSearch(param: string, value?: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {

    if (category) {

      const validatedCategory = validateOrDefault(category, options, null);
      
      setSelected(validatedCategory);
    }
  }, []);

  return (
    <div 
      className={styles.filter__selection}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button type="button" className={styles.tag} onClick={handleButton}>
        {selected ? selected : "Category"}
        <ArrowDropDownIcon fontSize="small" />
      </button>
      {isOpen && (
        <ul className={styles.selection}>
          {options.map((option, index) => (
            <li key={index}>
              <button
                type="button"
                className={`${styles.item} ${selected === option || searchParams.get("category")?.toString() === option ? styles.selected : ""}`}
                onClick={() => handleButtonSelection(option)}
              >
                 <AddRoundedIcon fontSize="small" />
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
