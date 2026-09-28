const officePositions = [
  "manager",
  "data manager",
  "software engineer",
  "database administrator",
  "sales representative",
  "warehouse cordinator",
];

export function validateEmployeeId(req, res, next) {
  const employeeId = Number(req.params.id);

  if (!Number.isInteger(employeeId) || employeeId <= 0) {
    return res.status(400).json({ error: "invalid employee id" });
  }

  req.employeeId = employeeId;

  next();
}

export function validateCreateEmployee(req, res, next) {
  const { first_name, last_name, email, position, office_id, reports_to } =
    req.body;

  if (
    first_name === undefined ||
    last_name === undefined ||
    email === undefined ||
    position === undefined ||
    office_id === undefined ||
    reports_to === undefined
  ) {
    return res.status(400).json({
      error:
        "first_name, last_name, email, position, office_id, reports_to are all required",
    });
  }

  if (
    typeof first_name !== "string" ||
    !first_name.trim() ||
    typeof last_name !== "string" ||
    !last_name.trim()
  ) {
    return res.status(400).json({ error: "invalid first or/and last name" });
  }

  if (typeof email !== "string" || !email.trim() || !email.includes("@")) {
    return res.status(400).json({ error: "invalid email information" });
  }

  if (
    typeof position !== "string" ||
    !position.trim() ||
    !officePositions.includes(position.trim().toLowerCase())
  ) {
    return res.status(400).json({ error: "invalid position" });
  }

  if (!Number.isInteger(office_id) || office_id <= 0) {
    return res.status(400).json({ error: "invalid office id" });
  }

  if (reports_to !== null) {
    if (!Number.isInteger(reports_to) || reports_to <= 0) {
      return res.status(400).json({ error: "invalid reports_to id" });
    }
  }

  req.validateBody = {
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    email: email.trim().toLowerCase(),
    position: position.trim(),
    office_id,
    reports_to: reports_to === null ? null : reports_to,
  };

  next();
}

export function validateUpdateEmployee(req, res, next) {
  const { first_name, last_name, email, position, office_id, reports_to } = req.body;

  const validatedBody = {};

  if (
    first_name === undefined &&
    last_name === undefined &&
    email === undefined &&
    position === undefined &&
    office_id === undefined &&
    reports_to === undefined
  ) {
    return res.status(400).json({
      error:
        "first_name, last_name, email, position, office_id or reports_to must be provided",
    });
  }

  if (first_name !== undefined) {
    if (typeof first_name !== "string" || !first_name.trim()) {
      return res.status(400).json({ error: "invalid first name" });
    }
    validatedBody.first_name = first_name;
  }

  if (last_name !== undefined) {
    if (typeof last_name !== "string" || !last_name.trim()) {
      return res.status(400).json({ error: "invalid last name" });
    }
    validatedBody.last_name = last_name;
  }

  if (email !== undefined) {
    if (typeof email !== "string" || !email.trim() || !email.includes("@")) {
      return res.status(400).json({ error: "invalid email address" });
    }
    validatedBody.email = email;
  }

  if (position !== undefined) {
    if (
      typeof position !== "string" ||
      !position.trim() ||
      !officePositions.includes(position)
    ) {
      return res.status(400).json({ error: "invalid position" });
    }
    validatedBody.position = position;
  }

  if (office_id !== undefined) {
    if (!Number.isInteger(office_id) || office_id <= 0) {
      return res.status(400).json({ error: "invalid office id" });
    }
    validatedBody.office_id = email;
  }

  if (reports_to !== undefined) {
    if (reports_to === null) {
      validated.reports_to = null;
    } else if (!Number.isInteger(reports_to) || reports_to <= 0) {
      return res.status(400).json({ error: "invalid reports_to id" });
    }
  }

  req.validateBody = validatedBody;

  next();
}
