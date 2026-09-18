export function validateProductId(req, res, next) {
  const id = req.params.id;

  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return res.status(400).json({ error: "Please enter a valid product id" });
  }

  req.productId = numericId;

  next();
}

export function validateProductBody(req, res, next) {
  const { name, price, category_id } = req.body;

  if (
    typeof name !== "string" ||
    !name.trim() ||
    price === undefined ||
    category_id === undefined
  ) {
    return res
      .status(400)
      .json({ error: "Name, price and category_id are required" });
  }

  req.validateBody = { name: name.trim(), price, category_id };

  next();
}

export function validateUpdateProduct(req, res, next) {
  const { name, price, category_id } = req.body;

  // Make sure at least one field is provided
  if (name === undefined && price === undefined && category_id === undefined) {
    return res.status(400).json({
      error: "Please provide the name, price or category_id to continue",
    });
  }

  // Validate name only if name was provided - if name is provided AND it is invalid
  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    return res.status(400).json({ error: "Name must be a non-empty string" });
  }

  // Validate price only if price was provided
  if (price !== undefined && (typeof price !== "number" || price < 0)) {
    return res
      .status(400)
      .json({ error: "Price must be a non-negative number" });
  }

  // Validate category_id only if category_id was provided.
  if (
    category_id !== undefined &&
    (!Number.isInteger(category_id) || category_id <= 0)
  ) {
    return res.status(400).json({ error: "Please enter a valid category_id" });
  }

  req.validateBody = { name: name?.trim(), price, category_id };

  next();
}
