/* eslint-disable @typescript-eslint/no-unused-vars */
type Product = {
  id: number;
  name: string;
  description?: string; // Optional property
};

const p1: Product = { id: 1, name: "Apple" };
const p2: Product = { id: 2, name: "Banana", description: "Organic" };
