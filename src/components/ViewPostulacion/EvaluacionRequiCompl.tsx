import { Evaluacion, EvaluacionIsNot } from '../ChecksIcons.tsx';
import Buttons from '../Buttons.tsx';
import { useState } from 'react';
import { useEvaluacion } from '../../utils/functions/useEvaluacion.ts';
import config from '../../utils/urls.ts'
import axios from 'axios';

type Props = {
  ruc: number;
}

const EvaluacionRequiCompl = ({ruc}: Props) => {

  const api = axios.create({
    baseURL: config.apiUrl
  })

  const [updateState, setUpdateState] = useState(false)

  const [countFour, setCountFour] = useState(0);
  const [countFive, setCountFive] = useState(0);
  const [countSix, setCountSix] = useState(0);

  const [isTrueFour, setIsTrueFour] = useState(false);
  const [isTrueFive, setIsTrueFive] = useState(false);
  const [isTrueSix, setIsTrueSix] = useState(false);

  const [isNeutroFour, setIsNeutroFour] = useState(true);
  const [isNeutroFive, setIsNeutroFive] = useState(true);
  const [isNeutroSix, setIsNeutroSix] = useState(true);


  const handlAprobarFour = ()=>{

    setIsTrueFour(!isTrueFour);
    setIsNeutroFour(true)
    setCountFour(1)
  }
  console.log(`valor de count4: ${countFour}`);
  const handlAprobarFive = ()=>{
    setIsTrueFive(!isTrueFive);
    setIsNeutroFive(true)
    setCountFive(1)

  }
  const handlAprobarSix = ()=>{
    setIsTrueSix(!isTrueSix);
    setIsNeutroSix(true)
    setCountSix(1)
  }

  const handleIsNotFour = ()=>{
    setIsNeutroFour(!isNeutroFour)
    setIsTrueFour(false);
    setCountFour(0)
  }
  console.log(`valor de not: ${countFour}`);
  const handleIsNotFive = ()=>{
    setIsNeutroFive(!isNeutroFive)
    setIsTrueFive(false);
    setCountFive(0)
  }
  const handleIsNotSix = ()=>{
    setIsNeutroSix(!isNeutroSix)
    setIsTrueSix(false);
    setCountSix(0)
  }

  const evaluacion = useEvaluacion(ruc, updateState);

  const handleAprobarEvaluacion =  async () =>{
    try {
      await api.put('/Update/EvaluacionRequisitos/',{
        ruc: ruc,
        evaluacuatro: contEvaTwo,
        evaluacinco: contEvaThree,
        evaluaseis: contEvaFour,
        flagevalua: 3,
        razonSocial: razonSocial,
        RepresentanteLegal: RepresentanteLegal,
        correo: correRepresentante,
        codetapa: 2
      })
      setUpdateState(true)
    }catch (error){
      toast.error(error.response.data.error)
    }
  }

  return (
    <section className="ml-[2.5rem] mt-4">
      <header>
        <span className="text-2xl font-bold">
          Evaluación complementaria de requisitos:
        </span>
      </header>
      <article className='text-gray-500 mt-2 flex  items-center w-full'>
        <div className='w-[520px] mr-[3rem]'>
          <p className='text-justify leading-relaxed'>No presenta sanción por infracción
            muy grave a la normativa sociolaboral, en materias de derechos fundamentales y
            de seguridad y salud en el trabajo, así como a la labor inspectiva, mediante
            una resolución de multa firme o consentida, con anterioridad de dos años a la
            fecha de solicitud de postulación al Reconocimiento “Sello Libre de Trabajo
            Infantil”.</p>
        </div>

        <Evaluacion
          // disabled={isTrueFour}
          isTrue={isTrueFour}
          onClick={handlAprobarFour}
        />
        <EvaluacionIsNot
          disabled={isTrueFour}
          isNeutro={isNeutroFour}
          onClick={handleIsNotFour}
        />
      </article>
      <article className='text-gray-500 mt-4 flex  items-center w-full'>
        <div className='w-[520px] mr-[3rem]'>
          <p className='text-justify leading-relaxed'>No registra sentencias consentidas
            y/o ejecutoriadas emitidas por el Poder Judicial, declarando fundada una
            demanda laboral incumplimiento de la normativa en materia de derechos
            laborales fundamentales y/o de la seguridad y salud en el trabajo, con
            anterioridad de dos años a la fecha de solicitud de la postulación.</p>
        </div>

        <Evaluacion
          // disabled={isTrueFive}
          isTrue={isTrueFive}
          onClick={handlAprobarFive}
        />
        <EvaluacionIsNot
          disabled={isTrueFive}
          isNeutro={isNeutroFive}
          onClick={handleIsNotFive}
        />
      </article>
      <article className='text-gray-500 mt-4 flex  items-center w-full'>
        <div className='w-[520px] mr-[3rem]'>
          <p className='text-justify leading-relaxed'>Registra proceso en trámite con
            sentencia de primera instancia por vulneración de derechos fundamentales
            laborales y/o de la seguridad y salud en el trabajo.</p>
        </div>
        <Evaluacion
          // disabled={isTrueSix}
          isTrue={isTrueSix}
          onClick={handlAprobarSix}
        />
        <EvaluacionIsNot
          // disabled={isTrueSix}
          isNeutro={isNeutroSix}
          onClick={handleIsNotSix}
        />
      </article>
      {evaluacion?.flagevalua === 1 && (
        <article className='mt-4'>
          <Buttons
            className="text-white bg-redMain py-1 mr-[1rem]
                  HoverButtonRed w-[120px]"
            // onClick={handleAprobar}
          >
            Aprobar
          </Buttons>
          <Buttons
            // onClick={handleDesaprobar}
            className=" bg-white HoverButton py-1">
            Desaprobar
          </Buttons>
        </article>
      )}
    </section>
  );
};

export default EvaluacionRequiCompl;