function swapKeysAndValues<T extends Record<string, unknown>>(
  obj: T
): Record<string, keyof T> {
  const swapped: Record<string, keyof T> = {};

  for (const key in obj) {
    const value = valueToString(obj[key]);
    if (value) {
      swapped[value] = key;
    }
  }

  return swapped;
}

function valueToString<T>(data: T): string | undefined {
  switch (typeof data) {
    case "string":
      return data;
    case "number":
    case "symbol":
    case "bigint":
    case "boolean":
    case "function":
      return data.toString();
    case "object":
      if (data === null) return "null";
      return JSON.stringify(data);
    default:
      return undefined;
  }
}

const original = {
  a: "1",
  b: 2,
  c: { x: 10 },
  d: null,
  e: true,
};

const swapped = swapKeysAndValues(original);
console.log(swapped);
