type AddFn = (a: number, b: number) => number;

const add: AddFn = (a, b) => {
  return a + b;
};

console.log(add(5, 3)); // 8
