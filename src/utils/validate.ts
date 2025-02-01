export function validateOrDefault<T>(
    value: T,
    expected: T | T[],
    defaultValue: T
  ): T {
    const isValid = Array.isArray(expected)
      ? expected.includes(value) 
      : value === expected;
  
    return isValid ? value : defaultValue;
  }

export function validateArrayOrEmpty<T>(
  value: T | T[],
  expected: T | T[],
): T[] {
  const isValueArray = Array.isArray(value);
  const isExpectedArray = Array.isArray(expected);

  let isValid: boolean;

  if (isValueArray && isExpectedArray) {
      isValid = value.every((val) => expected.includes(val));

  } else if (isValueArray) {
    isValid = value.every((val) => val === expected);

  } else if (isExpectedArray) {
    isValid = expected.includes(value);

  } else {
    isValid = value === expected;
  }

  return isValid ? (isValueArray ? value : [value]) : [];
}