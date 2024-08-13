const db = require('../database/db');

exports.getAgendamentos = (req, res) => {
  const sql = 'SELECT * FROM agendamentos';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar agendamentos' });
    }
    res.json(rows);
  });
};

exports.createAgendamento = (req, res) => {
  const { title, date } = req.body;
  const sql = 'INSERT INTO agendamentos (title, date) VALUES (?, ?)';
  db.run(sql, [title, date], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar agendamento' });
    }
    res.status(201).json({ id: this.lastID });
  });
};

exports.updateAgendamento = (req, res) => {
  const { id } = req.params;
  const { title, date } = req.body;
  const sql = 'UPDATE agendamentos SET title = ?, date = ? WHERE id = ?';
  db.run(sql, [title, date, id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar agendamento' });
    }
    res.json({ message: 'Agendamento atualizado com sucesso' });
  });
};

exports.deleteAgendamento = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM agendamentos WHERE id = ?';
  db.run(sql, id, function(err) {
    if (err) {
      return res.status(500).json({ message: 'Erro ao excluir agendamento' });
    }
    res.json({ message: 'Agendamento excluído com sucesso' });
  });
};
