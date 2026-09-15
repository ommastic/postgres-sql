import express from "express";
import cors from "cors";
import productRoutes from './routes/products.js';
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

app.use(errorHandler);


export default app;