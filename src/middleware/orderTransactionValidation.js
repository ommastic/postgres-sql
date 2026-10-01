export function validateCreateOrderTransaction(req, res, next) {
  const { customer_id, order_date, order_status, warehouse_id, items } =
    req.body;
  const validStatuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  const productIds = new Set();

  if (
    customer_id === undefined ||
    order_date === undefined ||
    order_status === undefined ||
    warehouse_id === undefined ||
    items === undefined
  ) {
    return res.status(400).json({
      error:
        "customer_id, order_date, order_status, warehouse_id, items are all required",
    });
  }

  if (!Number.isInteger(customer_id) || customer_id <= 0) {
    return res
      .status(400)
      .json({ error: "Customer id must be a positive integer" });
  }

  if (
    typeof order_date !== "string" ||
    !order_date.trim() ||
    Number.isNaN(Date.parse(order_date))
  ) {
    return res.status(400).json({ error: "invalid order date" });
  }

  if (
    typeof order_status !== "string" ||
    !order_status.trim() ||
    !validStatuses.includes(order_status.trim().toLowerCase())
  ) {
    return res.status(400).json({ error: "invalid order status" });
  }

  if (!Number.isInteger(warehouse_id) || warehouse_id <= 0) {
    return res
      .status(400)
      .json({ error: "Warehouse id must be a positive integer" });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "invalid items" });
  }

  for (const item of items) {
    
    if (item === null || typeof item !== "object" || Array.isArray(item)) {
      return res.status(400).json({ error: "item must be an object" });
    }

    const { product_id, quantity, unit_price } = item;

    if (
      product_id === undefined ||
      quantity === undefined ||
      unit_price === undefined
    ) {
      return res
        .status(400)
        .json({ error: "product_id, quantity and unit_price are required " });
    }
    if (!Number.isInteger(product_id) || product_id <= 0) {
      return res
        .status(400)
        .json({ error: "Product id must be a positive integer" });
    }

    if (productIds.has(product_id)) {
      return res.status(400).json({ error: "Duplicated product id in items" });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({ error: "Quantity must be a positive integer" });
    }

    if (
      typeof unit_price !== "number" ||
      !Number.isFinite(unit_price) ||
      unit_price < 0
    ) {
      return res.status(400).json({ error: "invalid unit price" });
    }
    productIds.add(product_id);
  }

  req.validateBody = {
    customer_id,
    order_date: order_date.trim(),
    order_status: order_status.trim().toLowerCase(),
    warehouse_id,
    items,
  };

  next();
}
