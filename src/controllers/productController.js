import db from "../db.js";

export async function getAllProducts(req, res) {
  try {
    const request = "SELECT * FROM products ORDER BY product_id";
    const result = await db.query(request);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
}


export async function searchProducts(req, res) {
  try {
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({ error: "please enter a search query" });
    }
    const request = "SELECT * FROM products WHERE name ILIKE $1";
    const result = await db.query(request, [`%${name}%`]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "search does not exist" });
    }
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}


export async function getProductById(req, res) {
  try {
    const id = req.params.id;
    const request = "SELECT * FROM products WHERE product_id = $1";
    const result = await db.query(request, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "product not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
}


export async function createProduct(req, res) {
  try {
    const { name, price, category_id } = req.body;
    if (!name?.trim() || price === undefined || category_id === undefined) {
      return res
        .status(400)
        .json({ error: "data missing, check and enter again" });
    }

    const request = `INSERT INTO products(name, price, category_id) VALUES ($1, $2, $3) RETURNING *`;
    const result = await db.query(request, [name, price, category_id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
}


export async function updateProduct(req, res) {
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
    const request =
      "UPDATE products SET name = COALESCE($1, name), price = COALESCE($2, price), category_id = COALESCE($3, category_id) WHERE product_id = $4 RETURNING *";
    const result = await db.query(request, [
      name,
      price,
      category_id,
      numericId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Missing product" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
}


export async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      return res.status(400).json({ error: "Enter a valid product id" });
    }
    const request = "DELETE FROM products WHERE product_id = $1 RETURNING *";
    const result = await db.query(request, [numericId]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Missing product, check the id and enter again" });
    }
    res.status(200).json({
      message: "Product deleted succesfully",
      product: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
}
