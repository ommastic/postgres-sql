import db from "../db.js";

export async function getAllPayments(req, res) {
  const request = "SELECT * FROM payments ORDER BY payment_id";
  const result = await db.query(request);
  res.json(result.rows);
}

export async function getPaymentById(req, res) {
  const paymentId = req.paymentId;

  const request = `SELECT * FROM payments WHERE payment_id = $1`;
  const result = await db.query(request, [paymentId]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "invalid payment id" });
  }

  res.json(result.rows[0]);
}

export async function createPayment(req, res) {
  const { order_id, amount, payment_date, payment_method, payment_status } =
    req.validateBody;

  const request = `INSERT INTO payments(order_id, amount, payment_date, payment_method, payment_status) VALUES($1, $2, $3, $4, $5) RETURNING *`;
  const result = await db.query(request, [
    order_id,
    amount,
    payment_date,
    payment_method,
    payment_status,
  ]);

  res.status(201).json(result.rows[0]);
}

export async function deletePayment(req, res) {
  const paymentId = req.paymentId;

  const request = `DELETE FROM payments WHERE payment_id = $1 RETURNING *`;
  const result = await db.query(request, [paymentId]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "invalid payment id" });
  }

  res
    .status(200)
    .json({ message: "payment deleted successfully", payment: result.rows[0] });
}

export async function updatePayment(req, res) {
  const paymentId = req.paymentId;
  const updates = req.validateBody;

  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");
  const paymentIDPosition = values.length + 1;
  values.push(paymentId);

  const request = `UPDATE payments SET ${setClause} WHERE payment_id = $${paymentIDPosition} RETURNING *`;
  const result = await db.query(request, values);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "invalid payment id" });
  }
  res.json(result.rows[0]);
}
