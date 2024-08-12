const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const agendamentosRoutes = require('./routes/agendamentosRoutes');

const app = express();

// Configurações de middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/agendamentos', agendamentosRoutes);

// Iniciando o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
