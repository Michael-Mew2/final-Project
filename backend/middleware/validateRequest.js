const validateRequest = (validateFn) => (req, res, next) => {
  const isValid = validateFn(req.body);
//   console.log(req.body);
  
  if (!isValid) {
    const errors = validateFn.errors.map((err) => err.message);
    return res.status(400).json({ errors });
  }
  next();
};

export default validateRequest;