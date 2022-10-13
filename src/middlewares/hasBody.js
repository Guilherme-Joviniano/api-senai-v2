export default (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      code: 400,
      message: ['Body is empty'],
      error: true,
    });
  }
  return next();
};
