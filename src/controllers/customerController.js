import db from '../db.js'

export async function getAllCustomers(req, res){
  const request = "SELECT * FROM customers ORDER BY customer_id"
  const result = await db.query(request);
  res.json(result.rows)
}

export async function getCustomerById(req, res){
  const numericId = req.customerId;

  const request = 'SELECT * FROM customers WHERE customer_id = $1 ORDER BY customer_id'
  const result = await db.query(request, [numericId]);

  if(result.rows.length === 0){
    return res.status(404).json({error: 'The customer id does not exist'})
  }

  res.json(result.rows[0])
}

export async function searchCustomers(req, res){
  const name = req.query.name;
  if (!name?.trim()) {
    return res.status(400).json({ error: "please enter a search query" });
  }
  const request = "SELECT * FROM customers WHERE last_name ILIKE $1";
  const result = await db.query(request, [`%${name.trim()}%`]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "search does not exist" });
  }
  res.json(result.rows);
}


export async function createCustomer(req, res){
  const { first_name, last_name, customer_address, email} = req.validateBody;

  const request = `INSERT INTO customers(first_name, last_name, customer_address, email) VALUES ($1, $2, $3, $4) RETURNING *`;
  const result = await db.query(request, [first_name, last_name, customer_address, email])

  res.status(201).json(result.rows[0])
}

export async function updateCustomer(req, res){
  const { first_name, last_name, customer_address, email} = req.validateBody;
  const id = req.customerId;

  const request = `UPDATE customers SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), customer_address = COALESCE($3, customer_address), email = COALESCE($4, email) WHERE customer_id = $5 RETURNING *`;

  const result = await db.query(request, [first_name, last_name, customer_address, email, id]);

  if (result.rows.length === 0){
    return res.status(404).json({error: 'Customer not found'})
  }

  res.json(result.rows[0]);

}

export async function deleteCustomer(req, res){
  const id = req.customerId;

  const request = 'DELETE FROM customers WHERE customer_id = $1 RETURNING *';
  const result = await db.query(request, [id]);

  if(result.rows.length === 0){
    return res.status(404).json({error: "Customer not found"})
  }

  res.status(200).json({message: "Customer deleted succesfully", customer: result.rows[0]});
}