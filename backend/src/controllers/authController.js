const users = [
  { username: 'admin', password: 'admin' }, 
];

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = user;
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Usuário ou senha inválidos' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erro ao fazer logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
};
