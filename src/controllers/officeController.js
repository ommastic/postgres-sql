import db from '../db.js'

export async function getAllOffice(req, res){
  const request = 'SELECT * FROM offices ORDER BY office_id';
  const result = await db.query(request)

  res.json(result.rows)
}


export async function getOfficeById(req, res){
  const officeId = req.officeId;

  const request = `SELECT * FROM offices WHERE office_id = $1`
  const result = await db.query(request, [officeId])

  if (result.rows.length === 0){
    return res.status(404).json({error: 'office id does not exist'})
  }

  res.json(result.rows[0])
}


export async function createOffice(req, res){
  const { address, city, state } = req.validateBody

  const request = `INSERT INTO offices(address, city, state) VALUES($1, $2, $3) RETURNING *`
  const result = await db.query(request, [address, city, state])

  res.status(201).json(result.rows[0])
}


export async function updateOffice(req, res){
  const officeId = req.officeId;

  const updates = req.validateBody;

  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ')
  const officeIdPosition = values.length + 1
  values.push(officeId)

  const request = `UPDATE offices SET ${setClause} WHERE office_id = $${officeIdPosition} RETURNING *`
  const result = await db.query(request, values)

  if (result.rows.length === 0){
    return res.status(404).json({error: 'office id does not exist'})
  }

  res.json(result.rows[0])
}


export async function deleteOffice(req, res){
  const officeId = req.officeId;

  const request = `DELETE FROM offices WHERE office_id = $1 RETURNING *`
  const result = await db.query(request, [officeId])

  if (result.rows.length === 0){
    return res.status(404).json({error: 'Resource id does not exist'})
  }

  res.json({message: 'Resource deleted successfully', office: result.rows[0]})
}