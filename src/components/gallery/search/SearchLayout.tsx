
import { Suspense } from "react";
import styles from "./search-layout.module.css";
import SearchBar from './SearchBar';
import SearchSuggestionProvider from "./suggestion/SuggestionProvider";
import SuggestionSkeleton from "./suggestion/SuggestionSkeleton";

export default function GallerySearch() {

    return (
      <div className={styles.search}>
        <div className={styles.search__content}>
          <SearchBar>
            <div className={styles.search__suggestion}>
              <p className={styles.suggestion__title}>Keywords:</p>
              <div className={styles.suggestion__tags}>
                <Suspense fallback={<SuggestionSkeleton />}>
                  <SearchSuggestionProvider />
                </Suspense>
              </div>
            </div>
          </SearchBar>
        </div>
      </div>
    );
}