export function validateCustomerId(req, res, next) {
  const numericId = Number(req.params.id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return res
      .status(400)
      .json({ error: "Customer id must be a positive integer" });
  }
  req.customerId = numericId;

  next();
}

export function validateCreateCustomer(req, res, next) {
  const { first_name, last_name, customer_address, email } = req.body;

  if (
    first_name === undefined ||
    last_name === undefined ||
    customer_address === undefined ||
    email === undefined
  ) {
    return res
      .status(400)
      .json({ error: "Please enter the information about the customer" });
  }

  if (typeof first_name !== "string" || !first_name.trim()) {
    return res.status(400).json({ error: "Enter an appropriate first Name" });
  }

  if (typeof last_name !== "string" || !last_name.trim()) {
    return res.status(400).json({ error: "Enter the correct lastName" });
  }

  if (typeof customer_address !== "string" || !customer_address.trim()) {
    return res
      .status(400)
      .json({ error: "Check the address and correct as appropriate" });
  }

  if (typeof email !== "string" || !email.trim() || !email.includes("@")) {
    return res.status(400).json({ error: "Enter a valid email address" });
  }

  req.validateBody = {
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    customer_address: customer_address.trim(),
    email: email.trim(),
  };

  next();
}

export function validateUpdateCustomer(req, res, next) {
  const { first_name, last_name, customer_address, email } = req.body;

  if (
    first_name === undefined &&
    last_name === undefined &&
    customer_address === undefined &&
    email === undefined
  ) {
    return res
      .status(400)
      .json({
        error: "Please enter at least one information about the customer",
      });
  }

  if (
    first_name !== undefined &&
    (typeof first_name !== "string" || !first_name.trim())
  ) {
    return res.status(400).json({ error: "The first name is invalid" });
  }

  if (
    last_name !== undefined &&
    (typeof last_name !== "string" || !last_name.trim())
  ) {
    return res.status(400).json({ error: "The last name is invallid" });
  }

  if (
    customer_address !== undefined &&
    (typeof customer_address !== "string" || !customer_address.trim())
  ) {
    return res.status(400).json({ error: "The customer address is invallid" });
  }

  if (
    email !== undefined &&
    (typeof email !== "string" || !email.trim() || !email.includes("@"))
  ) {
    return res.status(400).json({ error: "The email address is invallid" });
  }

  req.validateBody = {
    first_name: first_name?.trim(),
    last_name: last_name?.trim(),
    customer_address: customer_address?.trim(),
    email: email?.trim(),
  };

  next();
}
