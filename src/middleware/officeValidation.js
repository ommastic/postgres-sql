const cityLists = ["albany", "noland", "bronx"];
const stateLists = ["georgia", "nebraska", "new york"];

export function validateOfficeId(req, res, next) {
  const officeId = Number(req.params.id);

  if (!Number.isInteger(officeId) || officeId <= 0) {
    return res.status(400).json({ error: "invalid office id" });
  }

  req.officeId = officeId;

  next();
}

export function validateCreateOffice(req, res, next) {
  const { address, city, state } = req.body;

  if (address === undefined || city === undefined || state === undefined) {
    return res
      .status(400)
      .json({ error: "address, city and state information are required" });
  }

  if (typeof address !== "string" || !address.trim()) {
    return res.status(400).json({ error: "invalid physical address" });
  }

  if (
    typeof city !== "string" ||
    !city.trim() ||
    !cityLists.includes(city.trim().toLowerCase())
  ) {
    return res.status(400).json({ error: "invalid city" });
  }

  if (
    typeof state !== "string" ||
    !state.trim() ||
    !stateLists.includes(state.trim().toLowerCase())
  ) {
    return res.status(400).json({ error: "invalid state" });
  }

  req.validateBody = {
    address: address.trim(),
    city: city.trim().toLowerCase(),
    state: state.trim().toLowerCase(),
  };

  next();
}

export function validateUpdateOffice(req, res, next) {
  const { address, city, state } = req.body;
  const validatedBody = {};

  if (address === undefined && city === undefined && state === undefined) {
    return res
      .status(400)
      .json({ error: "address, city or state information is required" });
  }

  if (address !== undefined) {
    if (typeof address !== "string" || !address.trim()) {
      return res.status(400).json({ error: "invalid physical address" });
    }
    validatedBody.address = address.trim();
  }

  if (city !== undefined) {
    if (typeof city !== "string" || !city.trim() || !cityLists.includes(city.trim().toLowerCase())) {
      return res.status(400).json({ error: "invalid city" });
    }
    validatedBody.city = city.trim().toLowerCase();
  }

  if (state !== undefined) {
    if (typeof state !== "string" || !state.trim() || !stateLists.includes(state.trim().toLowerCase())) {
      return res.status(400).json({ error: "invalid state" });
    }
    validatedBody.state = state.trim().toLowerCase();
  }

  req.validateBody = validatedBody;

  next();
}
