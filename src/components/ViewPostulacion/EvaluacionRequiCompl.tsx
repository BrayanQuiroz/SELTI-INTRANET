import { Evaluacion, EvaluacionIsNot } from '../ChecksIcons.tsx';
import Buttons from '../Buttons.tsx';
import { useEffect, useState } from 'react';
import { useEvaluacion } from '../../utils/functions/useEvaluacion.ts';
import config from '../../utils/urls.ts';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import {
  aprobarEvaluacion,
  enviarEvaluacion,
} from '../../utils/functions/handleEvaluacion.ts';

type Props = {
  ruc: number;
  razonSocial: string;
  represent: string;
  etapaEdicion: number;
  correo: string;
};

const EvaluacionRequiCompl = ({
  ruc,
  razonSocial,
  represent,
  etapaEdicion,
  correo,
}: Props) => {
  const api = axios.create({
    baseURL: config.apiUrl,
  });

  const [updateState, setUpdateState] = useState(false);

  const [countFour, setCountFour] = useState(0);
  const [countFive, setCountFive] = useState(0);
  const [countSix, setCountSix] = useState(0);

  const [isTrueFour, setIsTrueFour] = useState(false);
  const [isTrueFive, setIsTrueFive] = useState(false);
  const [isTrueSix, setIsTrueSix] = useState(false);

  const [isNeutroFour, setIsNeutroFour] = useState(true);
  const [isNeutroFive, setIsNeutroFive] = useState(true);
  const [isNeutroSix, setIsNeutroSix] = useState(true);

  const handlAprobarFour = () => {
    setIsTrueFour(!isTrueFour);
    setIsNeutroFour(true);
    setCountFour(1);
  };
  const handlAprobarFive = () => {
    setIsTrueFive(!isTrueFive);
    setIsNeutroFive(true);
    setCountFive(1);
  };
  const handlAprobarSix = () => {
    setIsTrueSix(!isTrueSix);
    setIsNeutroSix(true);
    setCountSix(1);
  };

  const handleIsNotFour = () => {
    setIsNeutroFour(!isNeutroFour);
    setIsTrueFour(false);
    setCountFour(0);
  };

  const handleIsNotFive = () => {
    setIsNeutroFive(!isNeutroFive);
    setIsTrueFive(false);
    setCountFive(0);
  };
  const handleIsNotSix = () => {
    setIsNeutroSix(!isNeutroSix);
    setIsTrueSix(false);
    setCountSix(0);
  };

  const { evaluacion, isLoading, refetch } = useEvaluacion(ruc);

  const handleEvaluacion = async (state: number) => {
    await enviarEvaluacion({
      ruc,
      countFour,
      countFive,
      countSix,
      razonSocial,
      represent,
      correo,
      state: state,
      onSuccess: refetch,
    });
  };

  useEffect(() => {
    if (evaluacion.evaluacuatro === 1) {
      setIsTrueFour(true);
      setIsNeutroFour(true);
    } else {
      setIsTrueFour(false);
      setIsNeutroFour(false);
    }
  }, [evaluacion]);

  useEffect(() => {
    if (evaluacion.evaluacinco === 1) {
      setIsTrueFive(true);
      setIsNeutroFive(true);
    } else {
      setIsTrueFive(false);
      setIsNeutroFive(false);
    }
  }, [evaluacion]);

  useEffect(() => {
    if (evaluacion.evaluaseis === 1) {
      setIsTrueSix(true);
      setIsNeutroSix(true);
    } else {
      setIsTrueSix(false);
      setIsNeutroSix(false);
    }
  }, [evaluacion]);

  console.log(isNeutroFour);

  const handleDesaprobar = () => {
    if (countFour === 0 && countFive === 0 && countSix === 0) {
      Swal.fire({
        title: 'Confirmación',
        html: '¿Estás seguro de <b>Desaprobar</b> la evaluación complementaría?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Atrás',
      }).then((result) => {
        if (result.isConfirmed) {
          handleEvaluacion(4);
          toast.success('Evaluación complementaria de requisitos fue desaprobada', {
            style: { background: '#333', color: '#fff' },
          });
        }
      });
    } else {
      toast.error('Debe marcar las tres X para desaprobar', {
        style: { background: '#333', color: '#fff' },
      });
    }
  };

  const handleAprobar = () => {
    if (countFour === 1 && countFive === 1 && countSix === 1) {
      Swal.fire({
        title: 'Confirmación',
        html: '¿Estás seguro de <b>APROBAR</b> la evaluación complementaría?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Atrás',
      }).then((result) => {
        if (result.isConfirmed) {
          handleEvaluacion(3);
          toast.success('Evaluación complementaria de requisitos fue aprobada', {
            style: { background: '#333', color: '#fff' },
          });
        }
      });
    } else {
      toast.error('Debe marcar los tres checks para aprobar', {
        style: { background: '#333', color: '#fff' },
      });
    }
  };

  return (
    <section className="ml-[2.5rem] mt-4">
      <header>
        <span className="text-2xl font-bold">
          Evaluación complementaria de requisitos:
        </span>
      </header>
      <article className="text-gray-500 mt-2 flex  items-center w-full">
        <div className="w-[520px] mr-[3rem]">
          <p className="text-justify leading-relaxed">
            No presenta sanción por infracción muy grave a la normativa sociolaboral, en
            materias de derechos fundamentales y de seguridad y salud en el trabajo, así
            como a la labor inspectiva, mediante una resolución de multa firme o
            consentida, con anterioridad de dos años a la fecha de solicitud de
            postulación al Reconocimiento “Sello Libre de Trabajo Infantil”.
          </p>
        </div>

        <Evaluacion
          disabled={isTrueFour}
          isTrue={isTrueFour}
          onClick={handlAprobarFour}
        />
        <EvaluacionIsNot
          disabled={isTrueFour}
          isNeutro={isNeutroFour}
          onClick={handleIsNotFour}
        />
      </article>
      <article className="text-gray-500 mt-4 flex  items-center w-full">
        <div className="w-[520px] mr-[3rem]">
          <p className="text-justify leading-relaxed">
            No registra sentencias consentidas y/o ejecutoriadas emitidas por el Poder
            Judicial, declarando fundada una demanda laboral incumplimiento de la
            normativa en materia de derechos laborales fundamentales y/o de la seguridad y
            salud en el trabajo, con anterioridad de dos años a la fecha de solicitud de
            la postulación.
          </p>
        </div>

        <Evaluacion
          disabled={isTrueFive}
          isTrue={isTrueFive}
          onClick={handlAprobarFive}
        />
        <EvaluacionIsNot
          disabled={isTrueFive}
          isNeutro={isNeutroFive}
          onClick={handleIsNotFive}
        />
      </article>
      <article className="text-gray-500 mt-4 flex  items-center w-full">
        <div className="w-[520px] mr-[3rem]">
          <p className="text-justify leading-relaxed">
            Registra proceso en trámite con sentencia de primera instancia por vulneración
            de derechos fundamentales laborales y/o de la seguridad y salud en el trabajo.
          </p>
        </div>
        <Evaluacion disabled={isTrueSix} isTrue={isTrueSix} onClick={handlAprobarSix} />
        <EvaluacionIsNot
          disabled={isTrueSix}
          isNeutro={isNeutroSix}
          onClick={handleIsNotSix}
        />
      </article>
      {evaluacion?.flagevalua === 1 && (
        <article className="mt-4">
          <Buttons
            className="text-white bg-redMain py-1 mr-[1rem]
                  HoverButtonRed w-[120px]"
            onClick={handleAprobar}
          >
            Aprobar
          </Buttons>
          <Buttons onClick={handleDesaprobar} className=" bg-white HoverButton py-1">
            Desaprobar
          </Buttons>
        </article>
      )}
    </section>
  );
};

export default EvaluacionRequiCompl;
