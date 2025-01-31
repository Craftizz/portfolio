'use client';

import { ReadonlyURLSearchParams, usePathname, useRouter } from 'next/navigation';

export default function useSearchHandler() {
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (searchParams: ReadonlyURLSearchParams, params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([param, value]) => {
      if (value) {
        newParams.set(param, value);
      } else {
        newParams.delete(param);
      }
    });

    replace(`${pathname}?${newParams.toString()}`);
  };

  return { handleSearch };
}