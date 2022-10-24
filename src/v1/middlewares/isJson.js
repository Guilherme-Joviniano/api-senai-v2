export default (req, res, next) => {
  const {
    headers,
  } = req;

  if (headers['content-type'] !== 'application/json' || !headers['content-type']) {
    return res.status(415).json({
      error: true,
      message: ['Incorrectly Content-Type, is required a application/json to this request'],
    });
  }

  return next();
};
