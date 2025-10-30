import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World! Welcome to Express.js API");
});

app.use("/api/products", productRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
