const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

export function validateOrderId(req, res, next){
  const numericId = Number(req.params.id);

  if (!Number.isInteger(numericId) || numericId <= 0){
    return res.status(400).json({error: 'The order id must be a positive integer'})
  }

  req.orderId = numericId;

  next();

}

export function validateCreateOrder(req, res, next){
  const { customer_id, order_date, order_status } = req.body;
  
  if (customer_id === undefined || order_date === undefined || order_status === undefined){
    return res.status(400).json({error: "customer id, order date and order status values are required"})
  }

  if (!Number.isInteger(customer_id) || customer_id <= 0){
    return res.status(400).json({error: 'The customer id must be positive integer'})
  }

  if (typeof(order_date) !== 'string' || !order_date.trim() || Number.isNaN(Date.parse(order_date))){
    return res.status(400).json({error: 'The order_date value is invalid'})
  }

  if (typeof(order_status) !== 'string' || !order_status.trim() || !validStatuses.includes(order_status.trim().toLowerCase())){
    return res.status(400).json({error: 'The order status value is invalid'})
  }

  req.validateBody = {customer_id, order_date: order_date.trim(), order_status: order_status.trim()};

  next();
}


export function validateUpdateOrder(req, res, next){
  const { customer_id, order_date, order_status } = req.body;

  if (customer_id === undefined && order_date === undefined && order_status === undefined){
    return res.status(400).json({error: "At leaset customer id, order date or order status value is required"})
  }

  if (customer_id !== undefined && (!Number.isInteger(customer_id) || customer_id <= 0)){
    return res.status(400).json({error: 'The customer id must be positive integer'})
  }

  if (order_date !== undefined && (typeof(order_date) !== 'string' || !order_date.trim() || Number.isNaN(Date.parse(order_date)))){
    return res.status(400).json({error: 'The order_date value is invalid'})
  }

  if (order_status !== undefined && (typeof(order_status) !== 'string' || !order_status.trim() || !validStatuses.includes(order_status.trim().toLowerCase()))){
    return res.status(400).json({error: 'The order status value is invalid'})
  }

  req.validateBody = {customer_id, order_date: order_date?.trim(), order_status: order_status?.trim().toLowerCase()};

  next();
}