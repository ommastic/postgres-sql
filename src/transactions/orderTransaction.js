import db from "../db.js";
import AppError from "../errors/AppError.js";

export async function orderTransactions(req, res) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    const { customer_id, order_date, order_status, warehouse_id, items } =
      req.validateBody;
    const orderRequest = `INSERT INTO orders(customer_id, order_date, order_status) VALUES ($1, $2, $3) RETURNING *`;
    const orderResult = await client.query(orderRequest, [
      customer_id,
      order_date,
      order_status,
    ]);

    const order = orderResult.rows[0];
    const order_id = order.order_id;
    const createdItems = [];
    const finalInventory = [];

    const sortedItems = [...items].sort((a, b) => a.product_id - b.product_id);

    for (const item of sortedItems){
      const { product_id, quantity } = item;

      const unitPriceRequest = `SELECT price FROM products WHERE product_id = $1`;
      const unitPriceResponse = await client.query(unitPriceRequest, [
        product_id,
      ]);

      if (unitPriceResponse.rows.length === 0){
        throw new AppError("Product does not exist", 404);
      }

      const unit_price = unitPriceResponse.rows[0].price;

      const inventoryRequest = `SELECT * FROM inventory WHERE warehouse_id = $1 AND product_id = $2 FOR UPDATE`;
      const inventoryResponse = await client.query(inventoryRequest, [
        warehouse_id,
        product_id,
      ]);

      if (inventoryResponse.rows.length === 0){
        throw new AppError("Product not available in the warehouse", 404);
      }

      const availableQuantity = inventoryResponse.rows[0].quantity;

      if (availableQuantity < quantity){
        throw new AppError("Insufficient Inventory", 409);
      }

      const itemRequest = `INSERT INTO order_items( order_id, product_id, quantity, unit_price) VALUES($1, $2, $3, $4) RETURNING *`;
      const itemResult = await client.query(itemRequest, [
        order_id,
        product_id,
        quantity,
        unit_price,
      ]);

      const updatedInventory = `UPDATE inventory SET quantity = quantity - $1 WHERE warehouse_id = $2 AND product_id = $3 AND quantity >= $1 RETURNING *`;
      const updatedResult = await client.query(updatedInventory, [
        quantity,
        warehouse_id,
        product_id,
      ]);

      if (updatedResult.rows.length === 0){
        throw new AppError("Insufficient inventory", 409)
      }

      createdItems.push(itemResult.rows[0]);
      finalInventory.push(updatedResult.rows[0]);
    }

    await client.query("COMMIT");

    res
      .status(201)
      .json({ order, items: createdItems, inventory: finalInventory });
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
