import NavBarUsers from '../../components/NavBarUsers.tsx';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import PostulacionView from '../../components/ViewPostulacion/PostulacionView.tsx';
import EvaluacionRequisitos from '../../components/ViewPostulacion/EvaluacionRequisitos.tsx';
import { useEffect, useState } from 'react';
import config from '../../utils/urls.ts';
import axios from 'axios';
import AsistenciaTecnica from './AsistenciaTecnica.tsx';

const ViewPostulante = () => {
  const { hashCodpostul } = useParams();
  const decryptHash: string = hashCodpostul;

  const secretKey = '3L8GGWj/D683jhSvKmhFuV/7AjAuK123HOG17fabIKM=';
  const decodedHash = decodeURIComponent(decryptHash);
  const decrypt = CryptoJS.AES.decrypt(decodedHash, secretKey);
  const codpostul = decrypt.toString(CryptoJS.enc.Utf8);

  const postNumber = Number(codpostul);

  const api = axios.create({
    baseURL: config.apiUrl,
  });

  const [listPost, setListPost] = useState();

  useEffect(() => {
    const Listar = async () => {
      try {
        const response = await api.get(`/apiListar/VistaPostulacion/${codpostul}/`);
        setListPost(response.data);
      } catch (e) {
        console.error('Error al obtener los roles:', e);
      }
    };
    Listar();
  }, []);

  const ruc = listPost?.postulacion?.ruc;
  const razonSocial = listPost?.postulacion?.nompernatural;
  const represent = listPost?.postulacion?.nompernatural;
  const correo = listPost?.postulacion?.correo;
  const etapaEdicion = listPost?.postulacion?.codetapa;

  return (
    <div className="w-full font-medium text-redMain">
      <NavBarUsers rol="SECRETARIA-TECNICA" />
      <main className="max-w-[1300px] mx-auto ">
        <div className="pt-[3rem]">
          <div className="mb-[4rem]">
            <PostulacionView codpostul={postNumber} />
            <EvaluacionRequisitos
              ruc={ruc}
              razonSocial={razonSocial}
              represent={represent}
              etapaEdicion={etapaEdicion}
              correo={correo}
            />
            <AsistenciaTecnica codpostul={postNumber} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewPostulante;
