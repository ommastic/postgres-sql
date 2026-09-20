import db from "../db.js";

export async function getAllOrderItems(req, res){
  const request = 'SELECT * FROM order_items ORDER BY order_id, product_id'
  const result = await db.query(request);
  res.json(result.rows)
}

export async function getOrderItemWithOrderIdAndProductId(req, res){
  const orderId = req.orderId;
  const productId = req.productId;
  const request = `SELECT * FROM order_items WHERE order_id = $1 AND product_id = $2`;
  const result = await db.query(request, [orderId, productId])

  if (result.rows.length === 0){
    return res.status(404).json({error: 'Order item not found'})
  }

  res.json(result.rows[0])
}

export async function createOrderItem(req, res){
  const { order_id, product_id, quantity, unit_price} = req.validateBody;

  const request = `INSERT INTO order_items(order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4) RETURNING *`;
  const result = await db.query(request, [order_id, product_id, quantity, unit_price]);

  res.status(201).json(result.rows[0])

}

export async function updateOrderItem(req, res){
  const { quantity, unit_price } = req.validateBody;
  const orderId = req.orderId;
  const productId = req.productId;

  const request = `UPDATE order_items SET quantity = COALESCE($1, quantity), unit_price = COALESCE($2, unit_price) WHERE order_id = $3 AND product_id = $4 RETURNING *`
  const result = await db.query(request, [quantity, unit_price, orderId, productId])

  if (result.rows.length === 0){
    return res.status(404).json({error: "order_item does not exist"})
  }

  res.json(result.rows[0])

}


export async function deleteOrderItem(req, res){
  const orderId = req.orderId
  const productId = req.productId

  const request = `DELETE FROM order_items WHERE order_id = $1 AND product_id = $2 RETURNING *`
  const result = await db.query(request, [orderId, productId])

  if (result.rows.length === 0){
    return res.status(404).json({error: "Order item does not exist"})
  }

  res.json({message: 'order_item deleted successfully', order_item: result.rows[0]})
}