export default function validateProductId(req, res, next) {
  const id = req.params.id;

  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return res.status(400).json({ error: "Please enter a valid product id" });
  }

  req.productId = numericId

  next();
}
