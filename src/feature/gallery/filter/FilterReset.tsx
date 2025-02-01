'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

import styles from "./filter-selection.module.css";

export default function FilterReset() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const isFilterActive = Array.from(searchParams.entries()).length > 0;

    function handleButtonSelection() {
        router.replace(pathname);
    }

    if (!isFilterActive) {

        return null;
    }

    return (
      <div className={styles.filter__selection}>
        <button
          type="button"
          className={styles.tag}
          onClick={handleButtonSelection}
        >
          Clear
          <RefreshRoundedIcon fontSize="small" />
        </button>
      </div>
    );
}