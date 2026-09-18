export default function errorHandler(err, req, res, next){
  console.error(err);

  if (err.code === '23503'){
    return res.status(400).json({error: 'Referenced resource that does not exist'})
  }

  if (err.code === '23505'){
    return res.status(409).json({error: 'Resource already exist'})
  }

  res.status(500).json({error: "Server Error"})
};