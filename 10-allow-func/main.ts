class User {
  @allowFunc((a: number) => a > 0)
  age: number = 30;
  name = "Alex";
}

function allowFunc(func: (arg: any) => boolean) {
  return function (target: Object, propertyKey: string | symbol): void {
    let value: any = undefined;

    const setter = (newValue: any) => {
      if (func(newValue)) {
        value = newValue;
      } else {
        throw new Error(
          `Недопустимое значение - "${String(propertyKey)}" не может быть равен "${newValue}"`
        );
      }
    };
    const getter = () => value;
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

try {
  let user = new User();
  user.age = 10;
  user.age = -5;
  console.log(user.age);
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log(e.message);
  }
}
