import React, { useState } from "react";
import { Check, X, Trash2 } from "lucide-react";
import { Class } from "../types";

interface AttendanceSheetProps {
  selectedClass: Class;
  onSaveAttendance: (date: string, presentStudents: string[]) => void;
  onDeleteStudent: (studentId: string) => void;
}

export function AttendanceSheet({ 
  selectedClass, 
  onSaveAttendance,
  onDeleteStudent 
}: AttendanceSheetProps) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [presentStudents, setPresentStudents] = useState<Set<string>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const toggleAttendance = (studentId: string) => {
    const newPresent = new Set(presentStudents);
    if (newPresent.has(studentId)) {
      newPresent.delete(studentId);
    } else {
      newPresent.add(studentId);
    }
    setPresentStudents(newPresent);
  };

  const handleSave = () => {
    onSaveAttendance(date, Array.from(presentStudents));
    setPresentStudents(new Set());
  };

  const handleDeleteClick = (studentId: string) => {
    setShowDeleteConfirm(studentId);
  };

  const confirmDelete = (studentId: string) => {
    onDeleteStudent(studentId);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="space-y-4 p-4">
      {/* Input de Data e Botão */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Salvar Chamada
        </button>
      </div>

      {/* Tabela Responsiva */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Presença
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {selectedClass.students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm break-words">{student.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => toggleAttendance(student.id)}
                      className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${
                        presentStudents.has(student.id)
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {presentStudents.has(student.id) ? <Check size={24} /> : <X size={24} />}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {showDeleteConfirm === student.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => confirmDelete(student.id)}
                          className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700 text-xs"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-2 py-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 text-xs"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDeleteClick(student.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}