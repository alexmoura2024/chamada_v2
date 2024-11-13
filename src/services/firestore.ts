import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc,
  setDoc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Class, Student, Attendance } from '../types';

// Classes
export async function createClass(classData: Omit<Class, 'id'>) {
  const docRef = await addDoc(collection(db, 'classes'), classData);
  return { ...classData, id: docRef.id };
}

export async function getClasses() {
  const querySnapshot = await getDocs(collection(db, 'classes'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Class[];
}

export async function updateClass(classId: string, classData: Omit<Class, 'id'>) {
  const classRef = doc(db, 'classes', classId);
  await setDoc(classRef, classData, { merge: true });
}

// Attendance
export async function saveAttendance(attendance: Omit<Attendance, 'id'>) {
  return await addDoc(collection(db, 'attendance'), attendance);
}

export async function getAttendanceRecords(classId: string) {
  const q = query(
    collection(db, 'attendance'),
    where('classId', '==', classId)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Attendance[];
}