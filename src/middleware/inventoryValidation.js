export function validateInventoryId(req, res, next){
  const { warehouse_id, product_id} = req.params;

  const warehouseId = Number(warehouse_id);
  const productId = Number(product_id);

  if ((!Number.isInteger(warehouseId) || warehouseId <= 0) || (!Number.isInteger(productId) || productId <= 0)){
    return res.status(400).json({error: 'The warehouse id and the product id must be a positive integer'})
  }

  req.inventoryId = { warehouseId, productId }

  next();
}

export function validateCreateInventory(req, res, next){
  const { warehouse_id, product_id, quantity } = req.body;

  if (warehouse_id === undefined || product_id === undefined || quantity === undefined){
    return res.status(400).json({error: 'Warehouse id, product id and quantity id are required'})
  }

  if ((!Number.isInteger(warehouse_id) || warehouse_id <= 0) || (!Number.isInteger(product_id) || product_id <= 0) || (!Number.isInteger(quantity) || quantity < 0)){
    return res.status(400).json({error: 'The warehouse id, product id and quantity must be a non negative integers'})
  }

  req.validateBody = { warehouse_id, product_id, quantity }

  next();
}

export function validateUpdateInventory(req, res, next){
  const { quantity } = req.body;

  if (quantity === undefined){
    return res.status(400).json({error: 'quantity must be provided'})
  }

  if (!Number.isInteger(quantity) || quantity < 0){
    return res.status(400).json({error: 'Invalid quantity value'})
  }

  req.validateBody = { quantity };

  next();

}