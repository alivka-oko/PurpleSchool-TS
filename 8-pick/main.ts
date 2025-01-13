const user = {
  name: "Jeremy",
  age: 8,
  skills: ["typescript", "js"],
};

type Normalized<Type> = {
  [Key in keyof Type]: Type[Key];
};

type key = string | number | symbol;

function pickObjectKeys<T extends Record<key, any>>(
  user: T,
  argsArray: (keyof T)[] | keyof T
): Normalized<T> {
  if (Array.isArray(argsArray)) {
    return argsArray.reduce((acc, key) => {
      if (key in user) {
        acc[key] = user[key];
      }
      return acc;
    }, {} as Normalized<T>);
  } else {
    return {
      [argsArray]: user[argsArray],
    } as Normalized<T>;
  }
}

const res = pickObjectKeys<typeof user>(user, ["age", "skills"]);
const res2 = pickObjectKeys<typeof user>(user, "name");

console.log(res);
console.log(res2);
