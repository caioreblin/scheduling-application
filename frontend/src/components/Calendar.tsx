import React from 'react';
import Calendar from 'react-calendar';

interface SchedulingCalendarProps {
    agendamentos: Array<{ id: number; title: string; date: string }>;
    onEdit: (agendamento: { id: number; title: string; date: string }) => void;
    onDelete: (id: number) => void;
}

const SchedulingCalendar: React.FC<SchedulingCalendarProps> = ({ agendamentos, onEdit, onDelete }) => {
    const getTileContent = (date: Date) => {
        const dayAgendamentos = agendamentos.filter(
            agendamento => new Date(agendamento.date).toDateString() === date.toDateString()
        );

        return (
            <div>
                {dayAgendamentos.map(agendamento => (
                    <div key={agendamento.id}>
                        {agendamento.title}
                        <button onClick={() => onEdit(agendamento)}>Editar</button>
                        <button onClick={() => onDelete(agendamento.id)}>Excluir</button>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Calendar
            tileContent={({ date }) => getTileContent(date)}
        />
    );
};

export default SchedulingCalendar;
