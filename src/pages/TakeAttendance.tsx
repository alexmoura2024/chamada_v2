import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { StudentImport } from '../components/StudentImport';
import { StudentForm } from '../components/StudentForm';
import { AttendanceSheet } from '../components/AttendanceSheet';
import { Class } from '../types';
import { getClasses, updateClass, saveAttendance } from '../services/firestore';
import { Users } from 'lucide-react';

export function TakeAttendance() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [showStudentForm, setShowStudentForm] = useState(false);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const fetchedClasses = await getClasses();
        setClasses(fetchedClasses);
      } catch (error) {
        console.error('Error loading classes:', error);
      }
    };

    loadClasses();
  }, []);

  const handleImportStudents = async (classId: string, studentNames: string[]) => {
    const selectedClass = classes.find(c => c.id === classId);
    if (!selectedClass) return;

    const students = studentNames.map((name, index) => ({
      id: `${classId}-${index}`,
      name: name.trim()
    }));

    try {
      await updateClass(classId, { ...selectedClass, students });
      setClasses(classes.map(c => c.id === classId ? { ...c, students } : c));
    } catch (error) {
      console.error('Error importing students:', error);
    }
  };

  const handleAddStudent = async (name: string) => {
    if (!selectedClassId) return;

    const selectedClass = classes.find(c => c.id === selectedClassId);
    if (!selectedClass) return;

    const newStudent = {
      id: `${selectedClassId}-${Date.now()}`,
      name
    };

    const updatedStudents = [...selectedClass.students, newStudent];

    try {
      await updateClass(selectedClassId, { ...selectedClass, students: updatedStudents });
      setClasses(classes.map(c => 
        c.id === selectedClassId 
          ? { ...c, students: updatedStudents }
          : c
      ));
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (!selectedClassId) return;

    const selectedClass = classes.find(c => c.id === selectedClassId);
    if (!selectedClass) return;

    const updatedStudents = selectedClass.students.filter(
      student => student.id !== studentId
    );

    try {
      await updateClass(selectedClassId, { ...selectedClass, students: updatedStudents });
      setClasses(classes.map(c => 
        c.id === selectedClassId 
          ? { ...c, students: updatedStudents }
          : c
      ));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleSaveAttendance = async (date: string, presentStudents: string[]) => {
    if (!selectedClassId) return;

    try {
      await saveAttendance({
        date,
        classId: selectedClassId,
        presentStudents
      });
    } catch (error) {
      console.error('Error saving attendance:', error);
    }
  };

  const selectedClass = selectedClassId ? classes.find(c => c.id === selectedClassId) : null;

  return (
    <Layout title="Fazer Chamada">
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <select
            value={selectedClassId || ''}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma turma</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name} - {cls.semester}
              </option>
            ))}
          </select>

          {selectedClassId && (
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <StudentImport
                classId={selectedClassId}
                onImport={handleImportStudents}
              />
              <button
                onClick={() => setShowStudentForm(!showStudentForm)}
                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Users size={20} />
                {showStudentForm ? 'Ocultar Formulário' : 'Adicionar Aluno'}
              </button>
            </div>
          )}
        </div>

        {selectedClassId && showStudentForm && (
          <div className="border-t pt-4">
            <StudentForm onAddStudent={handleAddStudent} />
          </div>
        )}

        {selectedClass && selectedClass.students.length > 0 && (
          <AttendanceSheet
            selectedClass={selectedClass}
            onSaveAttendance={handleSaveAttendance}
            onDeleteStudent={handleDeleteStudent}
          />
        )}

        {selectedClass && selectedClass.students.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum aluno cadastrado. Importe uma lista ou adicione manualmente.
          </div>
        )}
      </div>
    </Layout>
  );
}