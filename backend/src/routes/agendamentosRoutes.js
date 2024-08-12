const express = require('express');
const { getAgendamentos, createAgendamento, updateAgendamento, deleteAgendamento } = require('../controllers/agendamentosController');
const router = express.Router();

router.get('/', getAgendamentos);
router.post('/', createAgendamento);
router.put('/:id', updateAgendamento);
router.delete('/:id', deleteAgendamento);

module.exports = router;
