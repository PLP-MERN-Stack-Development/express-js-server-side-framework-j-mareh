import { v4 as uuidv4 } from "uuid";

let products = [
  {
    id: uuidv4(),
    name: "Laptop",
    description: "A high performance laptop",
    price: 1200,
    category: "electronics",
    inStock: true,
  },
];

export default products;
