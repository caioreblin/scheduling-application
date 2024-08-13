import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

interface ModalAgendamentoProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSave: (agendamento: { title: string; date: string }) => void;
    agendamento?: { id?: number; title: string; date: string };
}

const ModalAgendamento: React.FC<ModalAgendamentoProps> = ({
    isOpen,
    onRequestClose,
    onSave,
    agendamento
}) => {
    const [title, setTitle] = useState(agendamento?.title || '');
    const [date, setDate] = useState(agendamento?.date || '');

    useEffect(() => {
        if (agendamento) {
            setTitle(agendamento.title);
            setDate(agendamento.date);
        }
    }, [agendamento]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave({ title, date });
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Agendamento">
            <h2>{agendamento ? 'Editar' : 'Criar'} Agendamento</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Data</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Salvar</button>
                <button type="button" onClick={onRequestClose}>
                    Cancelar
                </button>
            </form>
        </Modal>
    );
};

export default ModalAgendamento;
