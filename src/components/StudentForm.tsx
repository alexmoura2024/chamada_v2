import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface StudentFormProps {
  onAddStudent: (name: string) => void;
}

export function StudentForm({ onAddStudent }: StudentFormProps) {
  const [studentName, setStudentName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim()) {
      onAddStudent(studentName.trim());
      setStudentName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Nome do aluno"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
      >
        <UserPlus size={20} />
        Adicionar
      </button>
    </form>
  );
}