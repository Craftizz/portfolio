import { Suspense } from "react";
import FilterSearchBar from "./FilterSearchBar";
import FilterTagsContainer from "./FilterTagsContainer";

import styles from "./filter-layout.module.css";
import FilterSingleSelection from "./FilterSingleSelection";
import FilterMultipleSelection from "./FilterMultipleSelection";
import { time } from "console";

export default function FilterLayout({ 
  category,
  time,
  frame,
}: {
  category: string,
  time: string | string[],
  frame: string | string[];
}) {

    return (
      <div className={styles.filter__content}>
        <FilterSearchBar />
        <FilterSingleSelection
          filter="category"
          param={category}
          options={{ Short: "Narrative", Ads: "Advertisement" }}
        />
        <FilterMultipleSelection
          filter="time"
          param={time}
          options={{ sunrise: "Sunrise", day: "Day", sunset: "Sunset", night: "Night" }}
        />
        <FilterMultipleSelection
          filter="frame"
          param={frame}
          options={{ wide: "Wide", full: "Full", medium: "Medium", mediumclose: "Medium Close Up", closeup: "Close Up" }}
        />
        <Suspense>
          <FilterTagsContainer category={category} />
        </Suspense>
      </div>
    );
}