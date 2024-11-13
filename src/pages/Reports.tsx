import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Reports as ReportsComponent } from '../components/Reports';
import { Class, Attendance } from '../types';
import { getClasses, getAttendanceRecords } from '../services/firestore';

export function Reports() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);

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

  const handleClassSelect = async (classId: string) => {
    try {
      const records = await getAttendanceRecords(classId);
      setAttendanceRecords(records);
    } catch (error) {
      console.error('Error loading attendance records:', error);
    }
  };

  return (
    <Layout title="Relatórios">
      <ReportsComponent 
        classes={classes} 
        attendanceRecords={attendanceRecords} 
      />
    </Layout>
  );
}