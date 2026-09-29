import express from "express";
import cors from "cors";
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import orderItemsRoutes from './routes/orderItemsRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import warehouseRoutes from './routes/warehouseRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js';
import shipmentRoutes from './routes/shipmentRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import officeRoutes from './routes/officeRoutes.js'
import errorHandler from "./middleware/errorHandler.js";
import transactionRoutes from './routes/transactionRoutes.js'


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/order-items', orderItemsRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/warehouses', warehouseRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/shipments', shipmentRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/offices', officeRoutes)
app.use('/api/transactions', transactionRoutes)


//No route matched
app.use((req, res) => {
  res.status(404).json({error: 'Route not found'})
})

app.use(errorHandler);


export default app;