import db from '../db.js'

export async function getAllInventory(req, res){
  const request = 'SELECT * FROM inventory ORDER BY warehouse_id, product_id';
  const result = await db.query(request)

  res.json(result.rows)
}

export async function getInventoryWithId(req, res){
  const { warehouseId, productId } = req.inventoryId;

  const request = `SELECT * FROM inventory WHERE warehouse_id = $1 AND product_id = $2`;
  const result = await db.query(request, [warehouseId, productId])

  if (result.rows.length === 0){
    return res.status(404).json({error: 'Inventory record not found'})
  }

  res.json(result.rows[0])
}


export async function createInventory(req, res){
  const { warehouse_id, product_id, quantity } = req.validateBody;

  const request = `INSERT INTO inventory(warehouse_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *` 
  const result = await db.query(request, [warehouse_id, product_id, quantity])

  res.status(201).json(result.rows[0])
}


export async function updateInventory(req, res){
  const { quantity } = req.validateBody;
  const { warehouseId, productId } = req.inventoryId;
 
  
  const request = `UPDATE inventory SET quantity = $1 WHERE warehouse_id = $2 AND product_id = $3 RETURNING *`
  const result = await db.query(request, [quantity, warehouseId, productId])

  if (result.rows.length === 0){
    return res.status(404).json({error: 'Inventory record not found'})
  }
  res.json(result.rows[0])
}


export async function deleteInventory(req, res){
  const { warehouseId, productId } = req.inventoryId;

  const request = 'DELETE FROM inventory WHERE warehouse_id = $1 and product_id = $2 RETURNING *'
  const result = await db.query(request, [warehouseId, productId]);

  if (result.rows.length === 0){
    return res.status(404).json({error: 'Inventory record not found'})
  }

  res.json(result.rows[0])
}