import { Suspense } from "react";
import styles from "./search-layout.module.css";
import SearchBar from "./SearchBar";
import SearchSuggestionContainer from "./suggestion/SuggestionContainer";
import SuggestionSkeleton from "./suggestion/SuggestionSkeleton";

export default function GallerySearch() {
  return (
    <div className={styles.search}>
      <div className={styles.search__content}>
        <SearchBar>
          <div></div>
        </SearchBar>
        <div className={styles.suggestion__tags}>
          <Suspense fallback={<SuggestionSkeleton />}>
            <SearchSuggestionContainer />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
