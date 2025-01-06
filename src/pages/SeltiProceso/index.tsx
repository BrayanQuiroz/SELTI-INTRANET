import NavBarUsers from '../../components/NavBarUsers.tsx';
import { useEffect, useState } from 'react';
import Tablas from '../../components/Tablas.tsx';
import axios from 'axios';
import config from '../../utils/urls.ts';
import { Postualcion } from '../../utils/States.tsx';

const Index = () => {
  const api = axios.create({
    baseURL: config.apiUrl,
  });

  const [ListPost, setListPost] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    const Listar = async () => {
      try {
        const response = await api.get('/apiListar/PostulacionAll/');
        setListPost(response?.data?.data);
      } catch (e) {
        console.error('Error al obtener la lista de postulacion:', e);
      }
    };
    Listar();
  }, [isRefresh]);

  const columns = [
    { header: 'ID', key: 'codpostul' },
    { header: 'RUC', key: 'ruc' },
    { header: 'Asignado', key: 'nombre' },
    { header: 'Etapa', key: 'codetapa' },
    { header: 'Estado', key: 'flaglinea' },
    { header: 'Acciones', key: 'acciones' },
  ];
  useEffect(() => {
    document.title = 'Proceso Selti';
  }, []);

  return (
    <div className="w-full font-medium text-redMain">
      <NavBarUsers rol="SECRETARIA-TECNICA" />
      <main className="max-w-[1300px] mx-auto ">
        <div className="pt-[3rem]">
          <div className="bg-white p-[1rem] mb-[3rem]">
            <div className="flex-between border-b-4 border-red-600 pb-2 mb-8">
              <h2 className="text-3xl">Bandeja de pendientes</h2>
            </div>
            <div>
              <Tablas
                onRefresh={setIsRefresh}
                columns={columns}
                data={ListPost}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
