import { Suspense } from "react";
import FilterSearchBar from "./FilterSearchBar";
import FilterTags from "./FilterTags";
import FilterTagsContainer from "./FilterTagsContainer";

import styles from "./filter-layout.module.css";

export default function FilterLayout() {
    return(
        <div className={styles.filter__content}>
            <FilterSearchBar />
            <Suspense>
                <FilterTagsContainer />
            </Suspense>
        </div>
    )
}