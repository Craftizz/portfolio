"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { IconButton } from "@mui/material";
import useSearchHandler from "@/hooks/useSearchHandler";
import ClearIcon from "@mui/icons-material/Clear";

import styles from "./filter-search-bar.module.css";

export default function FilterSearchBar({ 
  query 
}: { 
  query: string
}) {

  const searchParams = useSearchParams();
  const { handleSearch } = useSearchHandler();

  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === "NumpadEnter") {
      const value = (event.target as HTMLInputElement).value;

      if (value === searchParams.get("query")?.toString()) {
        return;
      }

      handleSearch(searchParams, {
        query: (event.target as HTMLInputElement).value,
      });
    }
  }

  function handleClear() {
    if (inputRef.current) {
      inputRef.current.value = "";
      if (searchParams.has("query")) {
        handleSearch(searchParams, { query: null });
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
        defaultValue={query}
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
