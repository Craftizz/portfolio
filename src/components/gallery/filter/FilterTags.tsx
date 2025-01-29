'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useError } from "@/context/ErrorContext";
import FilterTagsSkeleton from "./FilterTagsSkeleton";

import styles from "./filter-tags.module.css";

export default function FilterTags({ tags }: { tags: string[] }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { setError } = useError();

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
  
      return <FilterTagsSkeleton />;
  }

  return (
    <div className={styles.tags}>
      {tags.map((tag, index) => (
        <button
          key={index}
          type="button"
          className={styles.tag}
          onClick={() => handleSearch("query", tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}