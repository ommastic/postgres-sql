import db from "../db.js";

export async function getAllCategories(req, res) {
  const request = "SELECT * FROM categories ORDER BY category_id";
  const result = await db.query(request);
  res.json(result.rows);
}

export async function getCategoryWithId(req, res) {
  const id = req.categoryId;

  const request = `SELECT * FROM categories WHERE category_id = $1`;
  const result = await db.query(request, [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "The category id is not available" });
  }

  res.json(result.rows[0]);
}

export async function createCategory(req, res) {
  const { category_name } = req.validateBody;

  const request = `INSERT INTO categories(category_name) VALUES($1) RETURNING *`;
  const result = await db.query(request, [category_name]);

  res.status(201).json(result.rows[0]);
}

export async function updateCategory(req, res) {
  const { category_name } = req.validateBody;
  const categoryId = req.categoryId;

  const request = `UPDATE categories SET category_name = $1 WHERE category_id = $2 RETURNING *`;
  const result = await db.query(request, [category_name, categoryId]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Invalid category id" });
  }

  res.json(result.rows[0]);
}

export async function deleteCategory(req, res) {
  const categoryId = req.categoryId;

  const request = `DELETE FROM categories WHERE category_id = $1 RETURNING *`;
  const result = await db.query(request, [categoryId]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "invalid category id" });
  }

  res.json(result.rows[0]);
}

