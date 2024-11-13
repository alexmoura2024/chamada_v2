import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface ClassFormProps {
  onCreateClass: (name: string, semester: string, totalHours: number) => void;
}

export function ClassForm({ onCreateClass }: ClassFormProps) {
  const [className, setClassName] = useState('');
  const [semester, setSemester] = useState('');
  const [totalHours, setTotalHours] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (className.trim() && semester.trim() && totalHours) {
      onCreateClass(className.trim(), semester.trim(), Number(totalHours));
      setClassName('');
      setSemester('');
      setTotalHours('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        placeholder="Nome da Disciplina"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        placeholder="Semestre (ex: 2024/01)"
        pattern="\d{4}/\d{2}"
        title="Formato: AAAA/SS (ex: 2024/01)"
        className="w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={totalHours}
        onChange={(e) => setTotalHours(e.target.value)}
        placeholder="Carga Horária"
        min="1"
        className="w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <PlusCircle size={20} />
        Criar Turma
      </button>
    </form>
  );
}