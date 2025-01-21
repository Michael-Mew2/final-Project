const validateRequest = (validateFn) => (req, res, next) => {
  const isValid = validateFn(req.body);
  // console.log(req.body, isValid);
  
  if (!isValid) {
    // console.error("Validation failed:", validateFn.errors);
    
    const errors = validateFn.errors.map((err) => err.message);
    // console.log(errors);
    
    return res.status(400).json({ errors });
  }
  next();
};

export default validateRequest;