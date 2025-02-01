'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useError } from "@/context/ErrorContext";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

import styles from "./filter-selection.module.css";

export default function FilterCopy() {

    const { setError } = useError();
    const [isCopied, setIsCopied] = useState(false);

    const searchParams = useSearchParams();
    const isFilterActive = Array.from(searchParams.entries()).length > 0;

    async function handleButtonSelection() {
        try {

            if (isCopied) {

                return;
            }

            const currentUrl = window.location.href;
            await navigator.clipboard.writeText(currentUrl);

            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);

        } catch(error) {

            setError("Failed to copy to clipboard.")
        }
        

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
            {isCopied ? (
                <>
                Copied
                <CheckRoundedIcon fontSize="small" />
                </>
            ) : (
                <>
                Copy
                <ContentCopyRoundedIcon fontSize="small" />
                </>
            )}
        </button>
      </div>
    );
}