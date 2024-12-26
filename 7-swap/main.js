"use strict";
function swapKeysAndValues(obj) {
    const swapped = {};
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
