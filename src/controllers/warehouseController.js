import db from '../db.js'

export async function getAllWarehouses(req, res){
  const request = 'SELECT * FROM warehouses ORDER BY warehouse_id'
  const result = await db.query(request)

  res.json(result.rows)
}


export async function getWarehouseById(req, res){
  const warehouseId = req.warehouseId;

  const request = 'SELECT * FROM warehouses WHERE warehouse_id = $1'
  const result = await db.query(request, [warehouseId])

  if (result.rows.length === 0){
    return res.status(404).json({error: 'warehouse does not exist'})
  }

  res.json(result.rows[0])
}

export async function createWarehouse(req, res){
  const { warehouse_name } = req.validateBody;

  const request = 'INSERT INTO warehouses(warehouse_name) VALUES($1) RETURNING *'
  const result = await db.query(request, [warehouse_name]);

  res.status(201).json(result.rows[0])
}

export async function updateWarehouse(req, res){
  const { warehouse_name } = req.validateBody;
  const warehouseId = req.warehouseId;

  const request = 'UPDATE warehouses SET warehouse_name = $1 WHERE warehouse_id = $2 RETURNING *'
  const result = await db.query(request, [warehouse_name, warehouseId]);

  if (result.rows.length === 0){
    return res.status(404).json({error: 'invalid warehouse id'})
  }

  res.json(result.rows[0])
}

export async function deleteWarehouse(req, res){
  const warehouseId = req.warehouseId;

  const request = 'DELETE FROM warehouses WHERE warehouse_id = $1 RETURNING *'
  const result = await db.query(request, [warehouseId])

  if (result.rows.length === 0){
    return res.status(404).json({error: 'invalid warehouse id'})
  }

  res.status(200).json({message: 'warehouse deleted successfully', warehouse: result.rows[0]})
}