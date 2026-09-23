export function validateWarehouseId(req, res, next){
  const numericId = Number(req.params.id);

  if (!Number.isInteger(numericId) || numericId <= 0){
    return res.status(400).json({error: 'The warehouse id must be a positive integer'})
  }

  req.warehouseId = numericId;

  next();

}

export function validateCreateWarehouse(req, res, next){
  const { warehouse_name } = req.body;

  if (warehouse_name === undefined){
    return res.status(400).json({error: 'warehouse name must be provided'})
  }

  if (typeof(warehouse_name) !== 'string' || !warehouse_name.trim()){
    return res.status(400).json({error: 'Invalid warehouse name'})
  }

  req.validateBody = { warehouse_name: warehouse_name.trim()}

  next();
}


export function validateUpdateWarehouse(req, res, next){
  const { warehouse_name } = req.body;

  if (warehouse_name === undefined){
    return res.status(400).json({error: 'warehouse name must be provided'})
  }

  if (typeof(warehouse_name) !== 'string' || !warehouse_name.trim()){
    return res.status(400).json({error: 'Invalid warehouse name'})
  }

  req.validateBody = { warehouse_name: warehouse_name.trim()}

  next();
}

