function swapKeysAndValues<T extends Record<string, any>>(
  obj: T
): Record<string, keyof T> {
  const swapped: Record<string, keyof T> = {};

  for (const key in obj) {
    const value = obj[key];
    if (value) {
      swapped[value] = key;
    }
  }

  return swapped;
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
