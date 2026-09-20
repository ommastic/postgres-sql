export function validateOrderItemIds(req, res, next){
  const orderId = Number(req.params.orderId);
  const productId = Number(req.params.productId);

  if ((!Number.isInteger(orderId) || orderId <= 0) || (!Number.isInteger(productId) || productId <= 0)){
    return res.status(400).json({error: 'The order id and product id must both be positive integer'})
  }

  req.orderId = orderId;
  req.productId = productId;

  next();
}


export function validateCreateOrderItem(req, res, next){
  const { order_id, product_id, quantity, unit_price} = req.body;

  if (order_id === undefined || product_id === undefined || quantity === undefined || unit_price === undefined){
    return res.status(400).json({error: 'order_id, product_id, quantity and unit_price values are all required'})
  }

  if (!Number.isInteger(order_id) || order_id <= 0){
    return res.status(400).json({error: 'order_id must be a positive integer'})
  }

  if (!Number.isInteger(product_id) || product_id <= 0){
    return res.status(400).json({error: 'product_id must be a positive integer'})
  }

  if (!Number.isInteger(quantity) || quantity <= 0){
    return res.status(400).json({error: 'quantity must be a positive integer'})
  }

  if (typeof unit_price !== "number" || !Number.isFinite(unit_price) || unit_price < 0){
    return res.status(400).json({error: 'unit_price must be a valid non-negative integer'})
  }

  req.validateBody = { order_id, product_id, quantity, unit_price }

  next();
}


export function validateUpdateOrderItem(req, res, next){

  const { quantity, unit_price} = req.body;


  if (quantity === undefined && unit_price === undefined){
    return res.status(400).json({error: 'quantity or unit_price values is required'})
  }

  if (quantity !== undefined && (!Number.isInteger(quantity) || quantity <= 0)){
    return res.status(400).json({error: 'quantity must be a positive integer'})
  }

  if (unit_price !== undefined && (typeof unit_price !== "number" || !Number.isFinite(unit_price) || unit_price < 0)){
    return res.status(400).json({error: 'unit_price must be a valid non-negative number'})
  }

  req.validateBody = { quantity, unit_price }

  next();
}


