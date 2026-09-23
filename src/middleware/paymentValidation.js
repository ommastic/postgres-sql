const methodOfPayment = ["credit card", "debit card", "cash"];
const statusOfPayment = ["completed", "failed", "pending", "refunded"];

export function validatePaymentId(req, res, next) {
  const paymentId = Number(req.params.id);

  if (!Number.isInteger(paymentId) || paymentId <= 0) {
    return res.status(400).json({ error: "invalid payment id" });
  }

  req.paymentId = paymentId;

  next();
}

export function validateCreatePayment(req, res, next) {
  const { order_id, amount, payment_date, payment_method, payment_status } =
    req.body;

  if (
    order_id === undefined ||
    amount === undefined ||
    payment_date === undefined ||
    payment_method === undefined ||
    payment_status === undefined
  ) {
    return res.status(400).json({
      error:
        "order_id, amount, payment_date, payment_method and payment_status are all required",
    });
  }

  if (!Number.isInteger(order_id) || order_id <= 0) {
    return res.status(400).json({ error: "invalid order id" });
  }

  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: "invalid amount value" });
  }

  if (
    typeof payment_date !== "string" ||
    !payment_date.trim() ||
    Number.isNaN(Date.parse(payment_date))
  ) {
    return res.status(400).json({ error: "invalid payment date" });
  }

  if (
    typeof payment_method !== "string" ||
    !payment_method.trim() ||
    !methodOfPayment.includes(payment_method.trim().toLowerCase())
  ) {
    return res.status(400).json({ error: "invalid payment method" });
  }

  if (
    typeof payment_status !== "string" ||
    !payment_status.trim() ||
    !statusOfPayment.includes(payment_status.trim().toLowerCase())
  ) {
    return res.status(400).json({ error: "invalid payment status" });
  }

  req.validateBody = {
    order_id,
    amount,
    payment_date,
    payment_method,
    payment_status,
  };

  next();
}

export function validateUpdatePayment(req, res, next) {
  const { order_id, amount, payment_date, payment_method, payment_status } =
    req.body;
  const validatedBody = {};

  if (
    order_id === undefined &&
    amount === undefined &&
    payment_date === undefined &&
    payment_method === undefined &&
    payment_status === undefined
  ) {
    return res.status(400).json({
      error:
        "order_id, amount, payment_date, payment_method or payment_status is required",
    });
  }

  if (order_id !== undefined) {
    if (!Number.isInteger(order_id) || order_id <= 0) {
      return res.status(400).json({ error: "invalid order id" });
    }
    validatedBody.order_id = order_id;
  }

  if (amount !== undefined) {
    if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: "invalid amount value" });
    }
    validatedBody.amount = amount;
  }

  if (payment_date !== undefined) {
    if (
      typeof payment_date !== "string" ||
      !payment_date.trim() ||
      Number.isNaN(Date.parse(payment_date))
    ) {
      return res.status(400).json({ error: "invalid payment date" });
    }
    validatedBody.payment_date = payment_date.trim();
  }

  if (payment_method !== undefined) {
    if (
      typeof payment_method !== "string" ||
      !payment_method.trim() ||
      !methodOfPayment.includes(payment_method.trim().toLowerCase())
    ) {
      return res.status(400).json({ error: "invalid payment method" });
    }
    validatedBody.payment_method = payment_method.trim().toLowerCase();
  }

  if (payment_status !== undefined) {
    if (
      typeof payment_status !== "string" ||
      !payment_status.trim() ||
      !statusOfPayment.includes(payment_status.trim().toLowerCase())
    ) {
      return res.status(400).json({ error: "invalid payment status" });
    }
    validatedBody.payment_status = payment_status.trim().toLowerCase();
  }

  req.validateBody = validatedBody;

  next();
}
