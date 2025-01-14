function difference<
  T extends Record<string, any>,
  U extends Record<string, any>
>(a: T, b: U): Pick<T, Exclude<keyof T, keyof U>> {
  const result: Partial<T> = {};

  for (const keyA in a) {
    if (!b[keyA]) {
      result[keyA] = a[keyA];
    }
  }

  return result as Pick<T, Exclude<keyof T, keyof U>>;
}

const a = { a: 5, b: "" };
const b = { a: 10, c: true };

const diff = difference(a, b);
console.log(diff);
