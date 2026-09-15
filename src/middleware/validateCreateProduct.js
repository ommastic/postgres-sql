export default function validateProductBody(req, res, next) {
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
