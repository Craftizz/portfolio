'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from "react";

import styles from "./index.module.css";
import SearchInput from './input/SearchInput';
import SearchSuggestion from './suggestion/SearchSuggestion';

export default function GallerySearch() {

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
      <div className={styles.search}>
        <div className={styles.search__content}>
          <div className={styles.search__bar}>
            {isInputFocused && (<SearchSuggestion onSearch={handleSearch} />)}
            <SearchInput
              onSearch={handleSearch}
              onFocusChange={setIsInputFocused}
              searchParams={searchParams}/>
          </div>
        </div>
      </div>
    );
}