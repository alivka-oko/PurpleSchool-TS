"use strict";
function difference(a, b) {
    const result = {};
    for (const key in a) {
        if (!(key in b)) {
            result[key] = a[key];
        }
    }
    return result;
}
// Пример использования:
const a = { a: 5, b: "" };
const b = { a: 10, c: true };
const diff = difference(a, b);
console.log(diff); // { b: "", d: 12 }
