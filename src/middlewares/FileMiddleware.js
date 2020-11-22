const isFile = async (req, res, next) => {
  const fileData = req.file;
  if (!fileData) return res.status(400).json({ error: 'File is not uploaded' });
  res.locals.file = fileData;
  return next();
};

module.exports = {
  isFile,
};
