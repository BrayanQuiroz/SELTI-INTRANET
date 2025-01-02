import { useEffect, useState } from 'react';
import config from '../urls.ts';
import axios from 'axios';

export const useEvaluacion = (ruc: number) => {
  const [evaluacion, setEvaluacion] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const api = axios.create({
    baseURL: config.apiUrl,
  });

  const fetchEvaluacion = async () => {
    if (!ruc) return;

    setIsLoading(true);
    try {
      const response = await api.get(`/apiListar/Evaluacions/${ruc}/`);
      setEvaluacion(response.data.data);
    } catch (error) {
      console.error(error.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // alert('volvi a recargarme')
    fetchEvaluacion();
  }, [ruc]);

  return {
    evaluacion,
    isLoading,
    refecth: fetchEvaluacion,
  };
};
