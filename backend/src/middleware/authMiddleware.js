exports.ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    res.status(401).json({ message: 'Você precisa estar logado para acessar esta página' });
  }
};
