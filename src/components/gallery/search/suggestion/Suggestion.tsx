"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./suggestion.module.css";
import SuggestionSkeleton from "./SuggestionSkeleton";
import { useError } from "@/context/ErrorContext";

export default function SearchSuggestion({ tags }: { tags: string[] }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { setError } = useError()

  function handleSearch(param: string, value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  if (!tags || tags.length === 0) {

    setError("Failed to gather search suggestions");

    return <SuggestionSkeleton />;
  }

  return (
    <>
      {tags.map((tag, index) => (
        <button
          key={index}
          type="button"
          className={styles.tags}
          onClick={() => handleSearch("query", tag)}
        >
          {tag}
        </button>
      ))}
    </>
  );
}
