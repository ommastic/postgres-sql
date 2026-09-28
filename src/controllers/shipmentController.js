import db from '../db.js';

export async function getAllShipments(req, res ){
  const request = 'SELECT * FROM shipments ORDER BY shipment_id'
  const result = await db.query(request);

  res.json(result.rows)
}


export async function getShipmentById(req, res ){
  const shipmentId = req.shipmentId;

  const request = 'SELECT * FROM shipments WHERE shipment_id = $1';
  const result = await db.query(request, [shipmentId])

  if (result.rows.length === 0){
    return res.status(404).json({error: 'The shipment id does not exist'})
  }

  res.json(result.rows[0])
}

export async function createShipment(req, res ){
  const { order_id, carrier, tracking_number, shipping_date, delivery_date, shipping_status } = req.validateBody;

  const request = `INSERT INTO shipments(order_id, carrier, tracking_number, shipping_date, delivery_date, shipping_status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
  const result = await db.query(request, [order_id, carrier, tracking_number, shipping_date, delivery_date, shipping_status]);

  res.status(201).json(result.rows[0])

}

export async function updateShipment(req, res ){
  const shipmentId = req.shipmentId;
  const updates = req.validateBody;

  const fields = Object.keys(updates)
  const values = Object.values(updates)

  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ')
  const shipmentIDPosition = values.length + 1

  values.push(shipmentId)

  const request = `UPDATE shipments SET ${setClause} WHERE shipment_id = $${shipmentIDPosition} RETURNING *`
  const result = await db.query(request, values)

  if (result.rows.length === 0){
    return res.status(404).json({error: 'Shipment id does not exist'})
  }

  res.json(result.rows[0])
}

export async function deleteShipment(req, res ){
  const shipmentId = req.shipmentId;

  const request = 'DELETE FROM shipments WHERE shipment_id = $1 RETURNING *';
  const result = await db.query(request, [shipmentId])

  if (result.rows.length === 0){
    return res.status(404).json({error: 'invalid shipment id'})
  }

  res.json({message: 'shipment was deleted successfully', shipment: result.rows[0]})
}