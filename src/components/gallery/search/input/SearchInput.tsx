import { useRef } from "react";

import styles from "./search-input.module.css";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

type SearchComponentProps = {
    onSearch: (param: string, value: string) => void;
    onFocusChange?: (isFocused: boolean) => void;
    searchParams: URLSearchParams;
  };

export default function SearchInput({ onSearch, onFocusChange, searchParams }: SearchComponentProps) {

  const inputRef = useRef<HTMLInputElement>(null);

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {

        if (event.key === 'Enter' 
            || event.key === 'NumpadEnter') {

            onSearch("query", (event.target as HTMLInputElement).value);
        }
    }

    function handleSearchButton() {

      if (inputRef.current) {

        const input = inputRef.current.value;

        if (input) {

          onSearch("query", inputRef.current.value);
        }
      }
    }

    function handleFocus() {

      if (onFocusChange) {

        onFocusChange(true);
      };
    }

    function handleBlur() {

      setTimeout(() => {
 
        if (onFocusChange) {

            onFocusChange(false);
        };
      }, 100);
    }

    return (
      <div className={styles.search__bar}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={styles.search__input}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <div className={styles.search__buttons}>
          <IconButton
            className={styles.search__button}
            onClick={handleSearchButton}
            color="inherit"
          >
            <SearchIcon className={styles.button__search} />
          </IconButton>
        </div>
      </div>
    );
}

