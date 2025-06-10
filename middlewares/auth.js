function protegerRota(req, res, next) {
  if (req.session && req.session.autenticado) {
    next(); // está autenticado
  } else {
    res.redirect('/adm'); // redireciona para login
  }
}

module.exports = protegerRota;