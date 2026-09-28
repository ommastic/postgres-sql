import db from "../db.js"


export async function getAllEmployees(req, res){
  const request = 'SELECT * FROM employees ORDER BY employee_id'
  const result = await db.query(request)

  res.json(result.rows)
}

export async function getEmployeeById(req, res){
  const employeeId = req.employeeId

  const request = `SELECT * FROM employees WHERE employee_id = $1`
  const result = await db.query(request, [employeeId])

  if (result.rows.length === 0){
    return res.status(404).json({error: "employee id does not exist"})
  }

  res.json(result.rows[0])
}

export async function createEmployee(req, res){
  const { first_name, last_name, email, position, office_id, reports_to } = req.validateBody;

  const request = `INSERT INTO employees(first_name, last_name, email, position, office_id, reports_to) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`
  const result = await db.query(request, [ first_name, last_name, email, position, office_id, reports_to ])

  res.status(201).json(result.rows[0])
}

export async function updateEmployee(req, res){
  const employeeId = req.employeeId;
  const updates = req.validateBody;

  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ')
  const employeeIdPosition = values.length + 1
  values.push(employeeId)

  const request = `UPDATE employees SET ${setClause} WHERE employee_id = $${employeeIdPosition} RETURNING *`
  const result = await db.query(request, values)

  if (result.rows.length === 0){
    return res.status(404).json({error: 'resource id does not exist'})
  }

  res.json(result.rows[0])
}

export async function deleteEmployee(req, res){
  const employeeId = req.employeeId

  const request = `DELETE FROM employees WHERE employee_id = $1 RETURNING *`
  const result = await db.query(request, [employeeId])

  if (result.rows.length === 0){
    return res.status(404).json({error: 'resource id does not exist'})
  }

  res.json({message: 'employee removed successfully', employee: result.rows[0]})
}