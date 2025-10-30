import { ValidationError } from "../utils/customErrors.js";

const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || !price || !category || inStock === undefined) {
    return next(new ValidationError("All fields are required"));
  }
  if (typeof price !== "number") {
    return next(new ValidationError("Price must be a number"));
  }
  next();
};

export default validateProduct;
