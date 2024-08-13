const express = require('express');
const { getAgendamentos, createAgendamento, updateAgendamento, deleteAgendamento } = require('../controllers/agendamentosController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', ensureAuthenticated, getAgendamentos);
router.post('/', ensureAuthenticated, createAgendamento);
router.put('/:id', ensureAuthenticated, updateAgendamento);
router.delete('/:id', ensureAuthenticated, deleteAgendamento);

module.exports = router;
