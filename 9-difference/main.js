"use strict";
function difference(a, b) {
    const result = {};
    for (const keyA in a) {
        if (!b[keyA]) {
            result[keyA] = a[keyA];
        }
    }
    return result;
}
const a = { a: 5, b: "" };
const b = { a: 10, c: true };
const diff = difference(a, b);
console.log(diff);
