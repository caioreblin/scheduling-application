import React, { useState, useEffect } from 'react';
import SchedulingCalendar from '../components/Calendar';
import ModalAgendamento from '../components/ModalAgendamento';
import api from '../services/api';

const AgendamentosPage: React.FC = () => {
    const [agendamentos, setAgendamentos] = useState<any[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAgendamento, setSelectedAgendamento] = useState<any | null>(null);
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [filtroData, setFiltroData] = useState('');

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const response = await api.get('/api/agendamentos');
                setAgendamentos(response.data);
            } catch (error) {
                console.error('Erro ao buscar agendamentos:', error);
            }
        };

        fetchAgendamentos();
    }, []);

    const handleSaveAgendamento = async (agendamento: { title: string; date: string }) => {
        try {
            if (selectedAgendamento) {
                // Editar agendamento existente
                await api.put(`/api/agendamentos/${selectedAgendamento.id}`, agendamento);
                setAgendamentos((prev) =>
                    prev.map((a) =>
                        a.id === selectedAgendamento.id ? { ...a, ...agendamento } : a
                    )
                );
            } else {
                // Criar novo agendamento
                const response = await api.post('/api/agendamentos', agendamento);
                setAgendamentos([...agendamentos, { ...agendamento, id: response.data.id }]);
            }
            setModalIsOpen(false);
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error);
        }
    };

    const handleDeleteAgendamento = async (id: number) => {
        try {
            await api.delete(`/api/agendamentos/${id}`);
            setAgendamentos(agendamentos.filter(a => a.id !== id));
        } catch (error) {
            console.error('Erro ao deletar agendamento:', error);
        }
    };

    const agendamentosFiltrados = agendamentos.filter(agendamento =>
        agendamento.title.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
        (!filtroData || new Date(agendamento.date).toDateString() === new Date(filtroData).toDateString())
    );

    return (
        <div>
            <h1>Agendamentos</h1>
            <div>
                <input
                    type="text"
                    placeholder="Filtrar por título"
                    value={filtroTitulo}
                    onChange={(e) => setFiltroTitulo(e.target.value)}
                />
                <input
                    type="date"
                    value={filtroData}
                    onChange={(e) => setFiltroData(e.target.value)}
                />
            </div>
            <button onClick={() => setModalIsOpen(true)}>Novo Agendamento</button>
            <SchedulingCalendar
                agendamentos={agendamentosFiltrados}
                onEdit={agendamento => {
                    setSelectedAgendamento(agendamento);
                    setModalIsOpen(true);
                }}
                onDelete={handleDeleteAgendamento}
            />
            <ModalAgendamento
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false);
                    setSelectedAgendamento(null);
                }}
                onSave={handleSaveAgendamento}
                agendamento={selectedAgendamento}
            />
        </div>
    );
};

export default AgendamentosPage;
