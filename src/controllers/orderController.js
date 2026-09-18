import db from "../db.js";

export async function getAllOrders(req, res){
  const request = 'SELECT * FROM orders ORDER BY order_id';
  const result = await db.query(request)
  res.json(result.rows)
}


export async function getOrderById(req, res){
  const id = req.orderId;

  const request = 'SELECT * FROM orders WHERE order_id = $1';
  const result = await db.query(request, [id]);

  if(result.rows.length === 0){
    return res.status(404).json({error: "Order not found"})
  }

  res.json(result.rows[0])
}

export async function createOrder(req, res){
  const { customer_id, order_date, order_status} = req.validateBody;

  const request = `INSERT INTO orders(customer_id, order_date, order_status) VALUES($1, $2, $3) RETURNING *`;
  const result = await db.query(request, [customer_id, order_date, order_status]);

  res.status(201).json(result.rows[0]);
}

export async function updateOrder(req, res){
  const {customer_id, order_date, order_status} = req.validateBody;
  const id = req.orderId;

  const request = `UPDATE orders SET customer_id = COALESCE($1, customer_id), order_date = COALESCE($2, order_date), order_status = COALESCE($3, order_status) WHERE order_id = $4 RETURNING *`;
  const result = await db.query(request, [customer_id, order_date, order_status, id]);

  if (result.rows.length === 0){
    return res.status(404).json({error: 'order not found'})
  }

  res.json(result.rows[0])

}

export async function deleteOrder(req, res){
  const id = req.orderId;

  const request = 'DELETE FROM orders WHERE order_id = $1 RETURNING *'
  const result = await db.query(request, [id])

  if (result.rows.length === 0){
    return res.status(404).json({error: 'order not found'})
  }

  res.json(result.rows[0])
}