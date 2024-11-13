import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface StudentImportProps {
  classId: string;
  onImport: (classId: string, students: string[]) => void;
}

export function StudentImport({ classId, onImport }: StudentImportProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const students = content.split('\n').filter(name => name.trim());
      onImport(classId, students);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileRef}
        accept=".txt"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
      >
        <Upload size={20} />
        Importar Alunos (.txt)
      </button>
    </div>
  );
}