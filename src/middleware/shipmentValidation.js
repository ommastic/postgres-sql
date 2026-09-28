const carrierType = ["fedex", "usps", "ups"];
const statusOfShipping = ["delivered", "cancelled", "shipped", "pending"];

export function validateShipmentId(req, res, next) {
  const shipmentId = Number(req.params.id);

  if (!Number.isInteger(shipmentId) || shipmentId <= 0) {
    return res.status(400).json({ error: "invalid shipment id" });
  }

  req.shipmentId = shipmentId;

  next();
}

export function validateCreateShipment(req, res, next) {
  const {
    order_id,
    carrier,
    tracking_number,
    shipping_date,
    delivery_date,
    shipping_status,
  } = req.body;

  if (
    order_id === undefined ||
    carrier === undefined ||
    tracking_number === undefined ||
    shipping_date === undefined ||
    shipping_status === undefined
  ) {
    return res.status(400).json({
      error:
        "order_id, carrier, tracking_number, shipping_date, and  shipping_status are all required",
    });
  }

  if (!Number.isInteger(order_id) || order_id <= 0) {
    return res
      .status(400)
      .json({ error: "order id must be a positive integer" });
  }

  if (
    typeof carrier !== "string" ||
    !carrier.trim() ||
    !carrierType.includes(carrier.trim().toLowerCase())
  ) {
    return res.status(400).json({ error: "invalid carrier information" });
  }

  if (typeof tracking_number !== "string" || !tracking_number.trim()) {
    return res.status(400).json({ error: "invalid tracking number" });
  }

  if (
    shipping_date !== undefined &&
    shipping_date !== null &&
    (typeof shipping_date !== "string" ||
      !shipping_date.trim() ||
      Number.isNaN(Date.parse(shipping_date)))
  ) {
    return res.status(400).json({ error: "invalid shipping date" });
  }

  if (
    delivery_date !== undefined &&
    delivery_date !== null &&
    (typeof delivery_date !== "string" ||
      !delivery_date.trim() ||
      Number.isNaN(Date.parse(delivery_date)))
  ) {
    return res.status(400).json({ error: "invalid delivery date" });
  }

  if (
    typeof shipping_status !== "string" ||
    !shipping_status.trim() ||
    !statusOfShipping.includes(shipping_status.trim().toLowerCase())
  ) {
    return res.status(400).json({ error: "invalid shipping status" });
  }

  req.validateBody = {
    order_id,
    carrier: carrier.trim().toLowerCase(),
    tracking_number: tracking_number.trim(),
    shipping_date:
      shipping_date === undefined || shipping_date === null
        ? null
        : shipping_date.trim(),
    delivery_date:
      delivery_date === undefined || delivery_date === null
        ? null
        : delivery_date.trim(),
    shipping_status: shipping_status.trim().toLowerCase(),
  };

  next();
}

export function validateUpdateShipment(req, res, next) {
  const {
    order_id,
    carrier,
    tracking_number,
    shipping_date,
    delivery_date,
    shipping_status,
  } = req.body;
  const validatedBody = {};

  if (
    order_id === undefined &&
    carrier === undefined &&
    tracking_number === undefined &&
    shipping_date === undefined &&
    delivery_date === undefined &&
    shipping_status === undefined
  ) {
    return res.status(400).json({
      error:
        "order_id, carrier, tracking_number, shipping_date, delivery_date, or  shipping_status is required",
    });
  }

  if (order_id !== undefined) {
    if (!Number.isInteger(order_id) || order_id <= 0) {
      return res.status(400).json({ error: "invalid order id" });
    }
    validatedBody.order_id = order_id;
  }

  if (carrier !== undefined) {
    if (
      typeof carrier !== "string" ||
      !carrier.trim() ||
      !carrierType.includes(carrier.trim().toLowerCase())
    ) {
      return res.status(400).json({ error: "invalid carrier" });
    }
    validatedBody.carrier = carrier.trim().toLowerCase();
  }

  if (tracking_number !== undefined) {
    if (typeof tracking_number !== "string" || !tracking_number.trim()) {
      return res.status(400).json({ error: "invalid tracking number" });
    }
    validatedBody.tracking_number = tracking_number.trim();
  }

  if (shipping_date !== undefined) {
    if (shipping_date === null) {
      validatedBody.shipping_date = null;
    } else {
      if (
        typeof shipping_date !== "string" ||
        !shipping_date.trim() ||
        Number.isNaN(Date.parse(shipping_date))
      ) {
        return res.status(400).json({ error: "invalid shipping date" });
      }
      validatedBody.shipping_date = shipping_date.trim();
    }
  }

  if (delivery_date !== undefined) {
    if (delivery_date === null) {
      validatedBody.delivery_date = null;
    } else {
      if (
        typeof delivery_date !== "string" ||
        !delivery_date.trim() ||
        Number.isNaN(Date.parse(delivery_date))
      ) {
        return res.status(400).json({ error: "invalid delivery date" });
      }

      validatedBody.delivery_date = delivery_date.trim();
    }
  }

  if (shipping_status !== undefined) {
    if (
      typeof shipping_status !== "string" ||
      !shipping_status.trim() ||
      !statusOfShipping.includes(shipping_status.trim().toLowerCase())
    ) {
      return res.status(400).json({ error: "invalid shipping status" });
    }
    validatedBody.shipping_status = shipping_status.trim().toLowerCase();
  }

  req.validateBody = validatedBody;

  next();
}
