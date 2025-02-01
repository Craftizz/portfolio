'use client';

import { ReadonlyURLSearchParams, usePathname, useRouter } from 'next/navigation';

export default function useSearchHandler() {
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(
    searchParams: ReadonlyURLSearchParams,
    params: Record<string, string | string[] | null>
  ) {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([param, value]) => {

        if (value === null || value === undefined) {

          newParams.delete(param);

        } else if (Array.isArray(value)) {
          newParams.delete(param);
          value.forEach((item) => newParams.append(param, item));

        } else {
          newParams.set(param, value);
        }
      });

    replace(`${pathname}?${newParams.toString()}`);
  }

  return { handleSearch };
}