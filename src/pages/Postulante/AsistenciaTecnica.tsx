import Buttons from '../../components/Buttons.tsx';
import config from '../../utils/urls.ts';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.tsx';

const AsistenciaTecnica = () => {
  const api = axios.create({
    baseURL: config.apiUrl,
  });

  const { authData } = useContext(AuthContext);
  const rucUser = authData?.rucUsuario;

  const handDownload = async () => {
    try {
      const response = await api.get(`/files/Estandar/${rucUser}`, {
        responseType: 'blob',
      });
      const urlTemp = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = urlTemp;
      link.setAttribute('download', `${rucUser}-asistenciaTecnica.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (e) {}
  };

  return (
    <section className="p-6 mt-[2rem] bg-white">
      <header className="border-b-4 border-red-600 mb-8">
        <h2 className="text-3xl font-bold mb-2">Asistencia Técnica</h2>
      </header>
      <article>
        <p className="text-xl mb-4">Descargar Archivo de Asistencia Técnica:</p>
        <Buttons
          className="text-white bg-redMain px-3 py-2 mr-[1rem] HoverButtonRed"
          onClick={handDownload}
        >
          DESCARGAR
        </Buttons>
      </article>
    </section>
  );
};

export default AsistenciaTecnica;
