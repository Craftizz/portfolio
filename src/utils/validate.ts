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