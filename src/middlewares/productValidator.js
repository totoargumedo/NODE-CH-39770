const productValidator = (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.price ||
    !req.body.code ||
    !req.body.thumbnail ||
    !req.body.stock
  ) {
    return res.status(400).json({
      success: false,
      response: "Campos enviados invalidos",
    });
  } else {
    next();
  }
};

export default productValidator;
