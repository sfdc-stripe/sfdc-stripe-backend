const handleError = (middleware) => async (req, res, next) => {
  try {
    await middleware(req, res, next);
  } catch (err) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500);
    res.send({ message: err.message });
  }
};

module.exports = { handleError };
