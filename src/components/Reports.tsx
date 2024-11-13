import React, { useMemo, useState } from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import { Class, Attendance } from '../types';

interface ReportsProps {
  classes: Class[];
  attendanceRecords: Attendance[];
}

export function Reports({ classes, attendanceRecords }: ReportsProps) {
  const [selectedClassId, setSelectedClassId] = useState<string>('');

  const reports = useMemo(() => {
    if (!selectedClassId) return [];
    const selectedClass = classes.find((c) => c.id === selectedClassId);
    if (!selectedClass) return [];

    const classAttendance = attendanceRecords.filter((record) => record.classId === selectedClassId);
    const totalClasses = new Set(classAttendance.map((record) => record.date)).size;

    return selectedClass.students
      .map((student) => {
        const presentDays = new Set(
          classAttendance
            .filter((record) => record.presentStudents.includes(student.id))
            .map((record) => record.date)
        ).size;

        const absences = totalClasses - presentDays;
        const totalAbsenceHours = absences * 2;
        const absencePercentage = (totalAbsenceHours / selectedClass.totalHours) * 100;
        const isApproved = absencePercentage <= 25;

        return {
          studentName: student.name,
          totalAbsences: absences,
          totalHours: totalAbsenceHours,
          absencePercentage,
          isApproved,
        };
      })
      .sort((a, b) => a.studentName.localeCompare(b.studentName));
  }, [classes, attendanceRecords, selectedClassId]);

  const selectedClass = classes.find((c) => c.id === selectedClassId);

  return (
    <div className="space-y-4 p-4">
      {/* Header and Class Selector */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={24} className="text-blue-600" />
            <h2 className="text-xl font-semibold">Relatório de Faltas</h2>
          </div>
          <div className="relative w-full sm:w-auto">
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full appearance-none bg-white border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione uma turma</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.semester}
                </option>
              ))}
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Table or No Data Message */}
      {selectedClassId && selectedClass ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 bg-gray-50 border-b">
            <p className="text-sm text-gray-600">Carga Horária Total: {selectedClass.totalHours}h</p>
          </div>

          {reports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aluno
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Faltas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Horas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      %
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 ${
                        report.absencePercentage > 25 ? 'text-red-600' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-sm">{report.studentName}</td>
                      <td className="px-6 py-4 text-sm">{report.totalAbsences}</td>
                      <td className="px-6 py-4 text-sm">{report.totalHours}h</td>
                      <td className="px-6 py-4 text-sm">{report.absencePercentage.toFixed(1)}%</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            report.isApproved
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {report.isApproved ? 'Aprovado' : 'Reprovado'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">Nenhuma chamada registrada para esta turma</div>
          )}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
          Selecione uma turma para ver o relatório de faltas
        </div>
      )}
    </div>
  );
}