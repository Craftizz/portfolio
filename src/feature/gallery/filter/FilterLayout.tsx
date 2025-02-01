import { Suspense } from "react";
import FilterSearchBar from "./FilterSearchBar";
import FilterTagsContainer from "./FilterTagsContainer";
import FilterSingleSelection from "./FilterSingleSelection";
import FilterMultipleSelection from "./FilterMultipleSelection";
import FilterReset from "./FilterReset";
import FilterCopy from "./FilterCopy";

import styles from "./filter-layout.module.css";
import FilterSelectionWrapper from "./FilterSelectionWrapper";

export default function FilterLayout({ 
  category,
  location,
  time,
  frame,
}: {
  category: string,
  location: string,
  time: string[],
  frame: string[];
}) {

    return (
      <div className={styles.filter__content}>
        <FilterSearchBar />
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
          <FilterTagsContainer category={category} location={location} time={time} frame={frame}/>
        </Suspense>
      </div>
    );
}