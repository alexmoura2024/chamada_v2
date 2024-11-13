import React from 'react';
import { Layout } from '../components/Layout';
import { ClassForm } from '../components/ClassForm';
import { useNavigate } from 'react-router-dom';
import { createClass } from '../services/firestore';

export function CreateClass() {
  const navigate = useNavigate();

  const handleCreateClass = async (name: string, semester: string, totalHours: number) => {
    try {
      await createClass({ name, semester, totalHours, students: [] });
      navigate('/attendance');
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <Layout title="Cadastrar Nova Turma">
      <div className="bg-white p-6 rounded-lg shadow">
        <ClassForm onCreateClass={handleCreateClass} />
      </div>
    </Layout>
  );
}