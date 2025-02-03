import { Suspense } from "react";
import FilterSearchBar from "./FilterSearchBar";
import FilterTagsContainer from "./FilterTagsContainer";
import FilterSingleSelection from "./FilterSingleSelection";
import FilterMultipleSelection from "./FilterMultipleSelection";
import FilterReset from "./FilterReset";
import FilterCopy from "./FilterCopy";

import styles from "./filter-layout.module.css";
import FilterSelectionWrapper from "./FilterSelectionWrapper";
import { Filters } from "@/types/filters";

export default function FilterLayout({ 
  filters
}: {
  filters: Filters
}) {

  const { query, category, location, time, frame } = filters;

    return (
      <div className={styles.filter__content}>
        <FilterSearchBar query={query} />
        <FilterSelectionWrapper>
          <FilterSingleSelection
            filter="category"
            param={category}
            options={{ 
              short: "Narrative", 
              ads: "Advertisement",
              musicvideo: "Music Video" 
            }}
          />
          <FilterSingleSelection
            filter="location"
            param={location}
            options={{ 
              interior: "Interior", 
              exterior: "Exterior"
            }}
          />
          <FilterMultipleSelection
            filter="time"
            param={time}
            options={{
              sunrise: "Sunrise",
              day: "Day",
              sunset: "Sunset",
              night: "Night",
            }}
          />
          <FilterMultipleSelection
            filter="frame"
            param={frame}
            options={{
              wide: "Wide",
              full: "Full",
              medium: "Medium",
              mediumclose: "Medium Close Up",
              closeup: "Close Up",
            }}
          />
          <FilterReset />
          <FilterCopy />
        </FilterSelectionWrapper>
        <Suspense>
          <FilterTagsContainer filters={filters}/>
        </Suspense>
      </div>
    );
}