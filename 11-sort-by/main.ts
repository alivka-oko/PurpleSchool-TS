import sortBy from "sort-by";

type User = {
  id: number;
  name: string;
  age: string;
  email: { primary: string };
};

let users: User[] = [
  {
    id: 7,
    name: "Foo",
    age: "34",
    email: { primary: "foo@email.com" },
  },
  {
    id: 3,
    name: "Baz",
    age: "67",
    email: { primary: "baz@email.com" },
  },
  {
    id: 4,
    name: "Bar",
    age: "67",
    email: { primary: "bar@email.com" },
  },
];

users.sort(sortBy("age", "email.primary"));

console.log(users);
