import express from "express";
import cors from "cors";
import productRoutes from './routes/products.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);


export default app;




/* CRUD 
  
// POST   /api/products       → Create
// GET    /api/products       → Read all
// GET    /api/products/:id   → Read one
// PATCH  /api/products/:id   → Update
// DELETE /api/products/:id   → Delete


challenge 1
app.get("/api/products", async (req, res) => {
  try {
    const request = "SELECT * FROM products ORDER BY product_id";
    const result = await db.query(request);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
}); 

challenge 2
app.get('/api/products/:id', async(req, res) => {
  try{
  const id = req.params.id;
  const request = 'SELECT * FROM products WHERE product_id = $1';
  const result = await db.query(request, [id]);
  if (result.rows.length === 0){
    return res.status(404).json({error: "product not found"});
  }
  res.json(result.rows[0])
  }
  catch(err){
    console.log(err);
    res.send(500).json({error: 'Server error'})
  }
}) 

//challenge 3
app.get('/api/products/search', async(req, res) => {
  try{
    const name = req.query.name;
    if(!name){
      return res.status(400).json({error: 'please enter a search query'})
    }
    const request = 'SELECT * FROM products WHERE name ILIKE $1';
    const result = await db.query(request, [`%${name}%`]);
    if (result.rows.length === 0){
      return res.status(404).json({error: 'search does not exist'})
    }
    res.json(result.rows)
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Server error"})
  }
}) 

app.post("/api/products", async (req, res) => {
  try {
    const { name, price, category_id } = req.body;
    if (!name?.trim() || price === undefined || category_id === undefined) {
      return res
        .status(400)
        .json({ error: "data missing, check and enter again" });
    }

    const request =
      `INSERT INTO products(name, price, category_id) VALUES ($1, $2, $3) RETURNING *`;
    const result = await db.query(request, [name, price, category_id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
}); 

app.patch("/api/products/:id", async (req, res) => {
  try {
    const { name, price, category_id } = req.body;
    const id = req.params.id;

    if (
      !name?.trim() ||
      price === undefined ||
      category_id === undefined ||
      !id
    ) {
      return res
        .status(400)
        .json({ error: "check the input data and enter again" });
    }
    const request =
      "UPDATE products SET name = $1, price = $2, category_id = $3 WHERE product_id = $4 RETURNING *";
    const result = await db.query(request, [name, price, category_id, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Missing product" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
});

//using COALESCE
app.patch("/api/products/:id", async (req, res) => {
  try {
    const { name, price, category_id } = req.body;
    const id = req.params.id;
    const numericId = Number(id);

    if (
      name === undefined &&
      price === undefined &&
      category_id === undefined
    ) {
      return res
        .status(400)
        .json({ error: "Provide at least one field to update" });
    }

    if (!Number.isInteger(numericId) || numericId <= 0) {
      return res.status(400).json({ error: "enter valid product id" });
    }
    const request = "UPDATE products SET name = COALESCE($1, name), price = COALESCE($2, price), category_id = COALESCE($3, category_id) WHERE product_id = $4 RETURNING *";
    const result = await db.query(request, [name, price, category_id, numericId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Missing product" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
}); 

app.delete('/api/products/:id', async(req, res) => {
  try{
    const id = req.params.id;
    const numericId = Number(id);
    if(!Number.isInteger(numericId) || numericId <= 0){
      return res.status(400).json({error: 'Enter a valid product id'})
    }
    const request = "DELETE FROM products WHERE product_id = $1 RETURNING *";
    const result = await db.query(request, [numericId]);
    if (result.rows.length === 0){
      return res.status(404).json({error: 'Missing product, check the id and enter again'})
    }
    res.status(200).json({message: "Product deleted succesfully", product: result.rows[0]})

  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Server Error'})
  }
}); 

export default app; */
