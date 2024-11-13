import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PlusCircle, ClipboardList, FileText } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Cadastrar Turma',
      description: 'Criar uma nova turma e importar alunos',
      icon: PlusCircle,
      path: '/create-class',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Fazer Chamada',
      description: 'Registrar presenças e faltas',
      icon: ClipboardList,
      path: '/attendance',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Gerar Relatório',
      description: 'Visualizar relatórios de frequência',
      icon: FileText,
      path: '/reports',
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <div className={`p-4 rounded-full ${item.color} text-white mb-4`}>
              <item.icon size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-center">{item.description}</p>
          </button>
        ))}
      </div>
    </Layout>
  );
}