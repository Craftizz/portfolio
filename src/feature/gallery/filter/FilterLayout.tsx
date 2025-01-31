import { Suspense } from "react";
import FilterSearchBar from "./FilterSearchBar";
import FilterTagsContainer from "./FilterTagsContainer";

import styles from "./filter-layout.module.css";
import FilterSingleSelection from "./FilterSingleSelection";

export default function FilterLayout({ 
    category 
} : { 
    category: string
}) {
    return (
      <div className={styles.filter__content}>
        <FilterSearchBar />
        <FilterSingleSelection
          filter="category"
          param={category}
          options={{ Short: "Narrative", Ads: "Advertisement" }}
        />
        <FilterSingleSelection
          filter="time"
          param={category}
          options={{ sunrise: "Sunrise", day: "Day", sunset: "Sunset", night: "Night" }}
        />
        <Suspense>
          <FilterTagsContainer category={category} />
        </Suspense>
      </div>
    );
}