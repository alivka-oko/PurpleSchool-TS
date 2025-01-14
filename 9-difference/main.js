"use strict";
function difference(a, b) {
    for (let keyB in b) {
        if (a[keyB]) {
            delete a[keyB];
        }
    }
    return a;
}
let a = { a: 5, b: "" };
let b = { a: 10, c: true };
let v0 = difference(a, b);
console.log(v0);
