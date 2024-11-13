export interface Student {
  id: string;
  name: string;
}

export interface Class {
  id: string;
  name: string;
  semester: string;
  totalHours: number;
  students: Student[];
}

export interface Attendance {
  date: string;
  classId: string;
  presentStudents: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
}

export interface AbsenceReport {
  studentName: string;
  totalAbsences: number;
  totalHours: number;
  isApproved: boolean;
  absencePercentage: number;
}