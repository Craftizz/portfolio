
export type Filters = {
  query: string;
  category: string;
  location: string;
  time: string[];
  frame: string[];
};


export function getFilterValue<K extends keyof Filters>(
  value: unknown,
  defaultValue: Filters[K]
) {
  if (Array.isArray(defaultValue)) {
    let normalized: string[] = [];

    if (typeof value === "string") {
      normalized = [value];

    } else if (Array.isArray(value)) {
      normalized = value.filter((item) => typeof item === "string");

    } else if (value) {
      normalized = [String(value)];
    }
    return (normalized.length > 0 ? normalized : defaultValue);
  }
  
  return (value ? String(value) : defaultValue);
}