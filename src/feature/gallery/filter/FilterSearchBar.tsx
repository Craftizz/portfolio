"use client";

import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import styles from "./filter-search-bar.module.css";

export default function FilterSearchBar() {

  const inputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(param: string, value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === "NumpadEnter") {
      const value = (event.target as HTMLInputElement).value;

      if (value === searchParams.get("query")?.toString()) {
        return;
      }

      handleSearch("query", (event.target as HTMLInputElement).value);
    }
  }

  function handleClear() {
    if (inputRef.current) {
      inputRef.current.value = "";

      if (searchParams.has("query")) {
        handleSearch("query", "");
      }
    }
  }

  return (
    <div className={styles.search__bar}>
      <input
        ref={inputRef}
        className={styles.search__input}
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Search"
        defaultValue={searchParams.get("query")?.toString()}
      />
      <IconButton
        className={styles.search__reset}
        color="inherit"
        size="small"
        onClick={() => handleClear()}
      >
        <ClearIcon className={styles.button__share} fontSize="small" />
      </IconButton>
    </div>
  );
}
