import { useEffect, useState } from 'react';
import config from '../urls.ts'
import axios from 'axios';

export const useEvaluacion = (ruc, updateState) => {
  const [evaluacion, setEvaluacion] = useState({});
  const api = axios.create({
    baseURL: config.apiUrl
  })

  useEffect(() => {
    if (ruc) {
      const fetchEvaluacion = async () => {
        try {
          const response = await api.get(`/apiListar/Evaluacions/${ruc}/`);
          setEvaluacion(response.data.data);
        } catch (error) {
          console.error(error.response?.data?.error);
        }
      };
      fetchEvaluacion();
    }
  }, [ruc, updateState]);

  return evaluacion;

}