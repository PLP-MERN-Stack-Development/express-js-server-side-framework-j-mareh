import { v4 as uuidv4 } from "uuid";
import products from "../models/products.js";
import { NotFoundError } from "../utils/customErrors.js";

export const getProducts = (req, res) => {
  let result = products;
  const { category, page = 1, limit = 5, search } = req.query;

  if (category) result = result.filter(p => p.category === category);
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const paginated = result.slice(start, end);

  res.json({ total: result.length, page: Number(page), data: paginated });
};

export const getProductById = (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError("Product not found"));
  res.json(product);
};

export const createProduct = (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

export const deleteProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError("Product not found"));
  const deleted = products.splice(index, 1);
  res.json({ message: "Product deleted", deleted });
};

export const getProductStats = (req, res) => {
  const stats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
};
