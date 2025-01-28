const user = {
  name: "Jeremy",
  age: 8,
  skills: ["typescript", "js"],
};

function pickObjectKeys<T extends Record<string, any>>(
  user: T,
  argsArray: (keyof T)[] | keyof T
): Record<string, any> {
  if (Array.isArray(argsArray)) {
    return argsArray.reduce((acc, key) => {
      if (key in user) {
        acc[key] = user[key];
      }
      return acc;
    }, {} as T);
  } else {
    return {
      [argsArray]: user[argsArray],
    };
  }
}

const res = pickObjectKeys(user, ["age", "skills"]);
const res2 = pickObjectKeys(user, "name");

console.log(res);
console.log(res2);
