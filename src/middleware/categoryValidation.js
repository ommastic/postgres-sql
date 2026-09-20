export function validateCategoryId(req, res, next){
  const numericId = Number(req.params.id);

  if (!Number.isInteger(numericId) || numericId <= 0 ){
    return res.status(400).json({error: 'The category id must be a positive integer'})
  }

  req.categoryId = numericId;

  next();
}


export function validateCreateCategory(req, res, next){
  const { name } = req.body;

  if (name === undefined){
    return res.status(400).json({error: 'The category name must be provided'})
  }
  
  if (typeof(name) !== 'string' || !name.trim()){
    return res.status(400).json({error: 'category name is invalid'})
  }

  req.validateBody = {name: name.trim()}

  next();
}

export function validateUpdateCategory(req, res, next){
  const { name } = req.body;

  if (name === undefined){
    return res.status(400).json({error: 'The category name must be provided'})
  }

  if (typeof(name) !== 'string' || !name.trim()){
    return res.status(400).json({error: 'category name is invalid'})
  }

  req.validateBody = {name: name.trim()};

  next();
}