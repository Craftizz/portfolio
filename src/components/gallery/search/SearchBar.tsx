"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import SearchInput from "./SearchInput";
import styles from "./search-bar.module.css";

export default function SearchBar({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isInputFocused, setIsInputFocused] = useState(false);

  function handleSearch(param: string, value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.search__bar}>
      {isInputFocused && children}
      <SearchInput
        onSearch={handleSearch}
        onFocusChange={setIsInputFocused}
        searchParams={searchParams}
      />
    </div>
  );
}
