import { toast } from 'react-hot-toast';
import config from '../urls.ts';
import axios from 'axios';
import { useState } from 'react';

type Props = {
  ruc: number;
  countFour: number;
  countFive: number;
  countSix: number;
  razonSocial: string;
  represent: string;
  correo: string;
  state: number;
  onSuccess?: () => void;
};

// state, 3 es aprobado, 4 desaprobador
export const enviarEvaluacion = async ({
  ruc,
  countFour,
  countFive,
  countSix,
  razonSocial,
  represent,
  correo,
  state,
  onSuccess,
}: Props) => {
  const api = axios.create({
    baseURL: config.apiUrl,
  });

  try {
    await api.put('/Update/EvaluacionRequisitos/', {
      ruc: ruc,
      evaluacuatro: countFour,
      evaluacinco: countFive,
      evaluaseis: countSix,
      flagevalua: state,
      razonSocial: razonSocial,
      RepresentanteLegal: represent,
      correo: correo,
      codetapa: 2,
    });

    if (onSuccess) {
      onSuccess();
    }
    return true;
  } catch (error) {
    toast.error(error.response.data.error);
    return false;
  }
};
