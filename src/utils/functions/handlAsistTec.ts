import config from '../urls.ts';
import axios from 'axios';
import { toast } from 'react-hot-toast';

type Props = {
  ruc: number;
  condicion: number;
  flagestandar: number;
  successMessage: string;
  correo: string;
  fecha: string;
};

const api = axios.create({
  baseURL: config.apiUrl,
});

export const handlAsistTec = async ({
  ruc,
  condicion,
  flagestandar,
  successMessage,
  correo,
  fecha,
}: Props) => {
  try {
    await api.post('/Update/Asist/', {
      ruc: ruc,
      flagestandar: flagestandar,
      condicion: condicion,
      correo: correo,
      fecha: fecha,
    });
    if (successMessage) {
      toast.success(successMessage);
    }
  } catch (e) {
    console.error('Error al obtener los roles:', e);
  }
};
