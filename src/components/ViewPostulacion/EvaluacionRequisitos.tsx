import { toast, Toaster } from 'react-hot-toast';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { AiFillCaretRight } from 'react-icons/ai';
import { Evaluacion, EvaluacionIsNot } from '../ChecksIcons.tsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../utils/urls.ts';
import Swal from 'sweetalert2';
import Buttons from '../Buttons.tsx';


type Props = {
  ruc: string;
  razonSocial: string;
  represent: string;
  etapaEdicion: number;
  correo: string;
}


const EvaluacionRequisitos = ({ruc, razonSocial,represent, etapaEdicion,correo}:Props) => {

  const api = axios.create({
    baseURL: config.apiUrl
  })


  const [updateState, setUpdateState] = useState(false)

  const [evaluacion, setEvaluacion] = useState({})

  useEffect(() => {
    if (ruc) {
      const ListarEvaliacion = async () => {
        try {
          const response = await api.get(`/apiListar/Evaluacions/${ruc}/`)
          setEvaluacion(response.data.data)
        } catch (error) {
          console.error(error.response?.data?.error)
        }
      }
      ListarEvaliacion()
    }
  }, [ruc, updateState])

  const [count, setCount] = useState(0);
  const [isTrueThree, setIsTrueThree] = useState(false);
  const [isNeutro, setIsNeutro] = useState(true);


  const handlAprobarThree = ()=>{
    setIsTrueThree(!isTrueThree);
    setIsNeutro(true)
    setCount(1)
  }

  const handleIsNot = ()=>{
    setIsNeutro(!isNeutro)
    setIsTrueThree(false);
    setCount(0)
  }

  const handleAprobar = ()=>{
    if (evaluacion?.evaluatres === 3){
      Swal.fire({
        title: "Confirmación",
        html: "¿Estás seguro de <b>APROBAR</b> la preevalicacion de requisitos?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Atrás",
      }).then((result) => {
        if (result.isConfirmed) {
          // handleSendPost();
          // handleEvaluacion();
        }
      });
    }else{
      toast.error('Debe marcar el check para aprobar.', {
        style: { background: '#333', color: '#fff' },
      });
    }

  }

  return (
    <div className=" p-[1rem] bg-white  mb-[1rem]">
      <Toaster />
      <Accordion allowZeroExpanded>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="flex border-b-4 border-red-600 pb-4">
                <AiFillCaretRight className="text-4xl" />
                <span className="text-3xl">Evaluación de requisitos</span>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="mt-4">
            <section className="ml-[2.5rem]">
              <header>
                <span className="text-2xl font-bold">Preevaluación de requisitos:</span>
              </header>
              <article className='text-gray-500 mt-2 flex  items-center w-full'>
                <p className='pr-[12.7rem]'>Se encuentra activa en el sistema de la SUNAT:</p>
                <Evaluacion isTrue={true} />
              </article>
              <article className='text-gray-500 mt-2 flex  items-center w-full'>
                <p className='pr-[11.8rem]'>Contribuyente habido en el sistema de la SUNAT:</p>
                <Evaluacion isTrue={true} />
              </article>
              <article className='text-gray-500 mt-2 flex  items-center w-full'>
                <p className='pr-[3rem]'>Realiza la actividad económica establecida para la presente edición:</p>
                {(evaluacion?.evaluatres === 1 || evaluacion?.evaluatres === 0) && (
                  <Evaluacion isTrue={isTrueThree}
                              onClick={handlAprobarThree}
                  />
                )}
                {(evaluacion?.evaluatres === 2 || evaluacion?.evaluatres === 0) && (
                  <EvaluacionIsNot
                    isNeutro={isNeutro}
                    onClick={handleIsNot}
                  />
                )}
              </article>
              <article className='mt-4'>
                <Buttons
                  className="text-white bg-redMain py-1 mr-[1rem]
                  HoverButtonRed w-[120px]"
                  onClick={handleAprobar}
                >
                  Aprobar
                </Buttons>
                <Buttons
                  // onClick={handleDesaprobar}
                  className=" bg-white HoverButton py-1">
                  Desaprobar
                </Buttons>
              </article>
            </section>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default EvaluacionRequisitos;