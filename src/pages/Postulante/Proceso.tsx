import Circle from '../../components/Circle.tsx';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.tsx';

const Proceso = () => {

  const {authData} = useContext(AuthContext)

  const codigoEtapa:number = Number(authData?.codigoEtapa);

  const [evaluacion, setEvaluacion] = useState(false);
  const [asistencia, setAsistencia] = useState(false);
  const [lineamientos, setLineamientos] = useState(false);
  const [verificacion, setVerificacion] = useState(false);
  const [otorgamiento, setOtorgamiento] = useState(false);

  useEffect(() => {
    setEvaluacion(codigoEtapa >= 2);
    setAsistencia(codigoEtapa >= 3)
    setLineamientos(codigoEtapa >= 4)
    setVerificacion(codigoEtapa >= 5)
    setOtorgamiento(codigoEtapa >= 6)

  }, [codigoEtapa]);

  return (
    <section className='p-6 mt-[2rem] bg-white mb-8'>
      <div className='border-b-4 border-red-600 mb-8'>
        <h2 className="text-3xl font-bold mb-2">
          Proceso de reconocimiento SELTI
        </h2>
      </div>
      <article className="flex justify-between">
        <Circle
          textCenter='1'
          textBottom='POSTULACIÓN'
          isActive={true}
        />
        <Circle
          textCenter='2'
          textBottom='EVALUACIÓN DE'
          textBottomTwo='REQUISITOS'
          isActive={evaluacion}
        />
        <Circle
          textCenter='3'
          textBottom='ASISTENCIA'
          textBottomTwo='TÉCNICA'
          isActive={asistencia}
        />
        <Circle
          textCenter='4'
          textBottom='LINEAMIENTOS Y'
          textBottomTwo='ESTÁNDARES'
          isActive={lineamientos}
        />
        <Circle
          textCenter='5'
          textBottom='VERIFICACIÓN DE NO'
          textBottomTwo='USO DE MANO DE'
          textBottomThree='OBRA INFANTIL'
          isActive={verificacion}
        />
        <Circle
          textCenter='6'
          textBottom='OTORGAMIENTO'
          isActive={otorgamiento}
        />
      </article>
    </section>
  );
};

export default Proceso;