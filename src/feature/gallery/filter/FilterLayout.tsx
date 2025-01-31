import { Suspense } from "react";
import FilterSearchBar from "./FilterSearchBar";
import FilterTagsContainer from "./FilterTagsContainer";

import styles from "./filter-layout.module.css";
import FilterSingleSelection from "./FilterSingleSelection";

export default function FilterLayout() {
    return(
        <div className={styles.filter__content}>
            <FilterSearchBar />
            <FilterSingleSelection options={["Short", "Ads"]} />
            <Suspense>
                <FilterTagsContainer />
            </Suspense>
        </div>
    )
}