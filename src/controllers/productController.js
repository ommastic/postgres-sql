import db from "../db.js";

export async function getAllProducts(req, res) {
  const request = "SELECT * FROM products ORDER BY product_id";
  const result = await db.query(request);
  res.json(result.rows);
}

export async function searchProducts(req, res) {
  const name = req.query.name;
  if (!name?.trim()) {
    return res.status(400).json({ error: "please enter a search query" });
  }
  const request = "SELECT * FROM products WHERE name ILIKE $1";
  const result = await db.query(request, [`%${name}%`]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "search does not exist" });
  }
  res.json(result.rows);
}

export async function getProductById(req, res) {
  const id = req.productId;

  const request = "SELECT * FROM products WHERE product_id = $1";
  const result = await db.query(request, [id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "product not found" });
  }
  res.json(result.rows[0]);
}

export async function createProduct(req, res) {
  const { name, price, category_id } = req.validateBody;
  const request = `INSERT INTO products(name, price, category_id) VALUES ($1, $2, $3) RETURNING *`;
  const result = await db.query(request, [name, price, category_id]);
  res.status(201).json(result.rows[0]);
}

export async function updateProduct(req, res) {
  const { name, price, category_id } = req.validateBody;
  const id = req.productId;

  const request =
    "UPDATE products SET name = COALESCE($1, name), price = COALESCE($2, price), category_id = COALESCE($3, category_id) WHERE product_id = $4 RETURNING *";
  const result = await db.query(request, [name, price, category_id, id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Missing product" });
  }
  res.json(result.rows[0]);
}

export async function deleteProduct(req, res) {
  const id = req.productId;
  const request = "DELETE FROM products WHERE product_id = $1 RETURNING *";
  const result = await db.query(request, [id]);
  if (result.rows.length === 0) {
    return res
      .status(404)
      .json({ error: "Missing product, check the id and enter again" });
  }
  res.status(200).json({
    message: "Product deleted successfully",
    product: result.rows[0],
  });
}
