import express from "express";
import cors from "cors";
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js'
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);


//No route matched
app.use((req, res) => {
  res.status(404).json({error: 'Route not found'})
})

app.use(errorHandler);


export default app;