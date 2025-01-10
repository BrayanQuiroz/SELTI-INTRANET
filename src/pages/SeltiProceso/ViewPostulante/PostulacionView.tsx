import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { AiFillCaretRight } from 'react-icons/ai';
import Buttons from '../../../components/Buttons.tsx';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../utils/urls.ts';
import TablasSimples from '../../../components/TablasSimples.tsx';
import Swal from 'sweetalert2';
import { toast, Toaster } from 'react-hot-toast';
import { handlePostulacion } from '../../../utils/functions/AprobarPostulacion.ts';
import { AuthContext, defaultAuthData } from '../../../context/AuthContext.tsx';

type PostProps = {
  codpostul: number;
};

const PostulacionView = ({ codpostul }: PostProps) => {
  const api = axios.create({
    baseURL: config.apiUrl,
  });

  const { authData } = useContext(AuthContext);

  const nameUser = authData?.nameuser;

  const [isUpdate, setIsUpdate] = useState(false);

  const columnsRP = [
    { header: 'Nombre(s).', key: 'nombre' },
    { header: 'Apellido(s).', key: 'apellido' },
    { header: 'Tipo de doc.', key: 'tipodoc' },
    { header: 'Nro. de Doc.', key: 'numdoc' },
    { header: 'Cargo', key: 'cargo' },
    { header: 'Email', key: 'email' },
    { header: 'Celular', key: 'celular' },
  ];

  const columnsPF = [
    { header: 'Nombre(s).', key: 'nombre' },
    { header: 'Apellido(s).', key: 'apellido' },
    { header: 'Tipo de doc.', key: 'tipodoc' },
    { header: 'Nro. de Doc.', key: 'numdoc' },
    { header: 'Cargo', key: 'cargo' },
    { header: 'Email', key: 'email' },
    { header: 'Celular', key: 'celular' },
  ];

  const columnsUP = [
    { header: 'Departamento', key: 'DEPARTAMENTO' },
    { header: 'Provincia', key: 'PROVINCIA' },
    { header: 'Distrito', key: 'DISTRITO' },
    { header: 'Dirección exacta', key: 'DIRECCION' },
    { header: 'Tipo de Cultivo', key: 'PRODUCTO' },
    { header: 'Nº de Hectáreas', key: 'HECTAREAS' },
  ];

  const [ListPostulacion, SetListPostulacion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [represent, setRepresent] = useState([]);
  const [puntosFocales, setPuntosFocales] = useState([]);
  const [unidadProductiva, setUnidadProductiva] = useState([]);

  useEffect(() => {
    const Listar = async () => {
      try {
        const response = await api.get(
          `/apiListar/VistaPostulacion/${codpostul}/`,
        );
        SetListPostulacion(response?.data);
      } catch (e) {
        console.error('Error al obtener VistaPostulacion:', e);
      }
    };
    Listar();
  }, [isUpdate]);

  const handleSendPost = async () => {
    const {
      razonsocial,
      numdoc,
      ruc,
      correoRegis,
      nompernatural,
      apellidoPart,
      apellidoMart,
    } = ListPostulacion.postulacion;

    await handlePostulacion(
      numdoc,
      nompernatural,
      apellidoPart,
      apellidoMart,
      razonsocial,
      correoRegis,
      ruc,
      1,
    );
    toast.success('Postulación aprobada');
  };

  const handleRechazar = async () => {
    const { ruc, correoRegis, razonsocial } = ListPostulacion.postulacion;

    handlePostulacion(null, null, null, null, razonsocial, correoRegis, ruc, 2);
    toast.success('Postulación rechazada');
  };

  const handleEvaluacion = async () => {
    const { ruc } = ListPostulacion?.postulacion;

    try {
      await api.post('/Create/EvaluacionEstado/', {
        ruc: ruc,
        evaluauno: 1,
        evaluados: 1,
        evaluatres: 0,
        evaluacuatro: 0,
        evaluacinco: 0,
        evaluaseis: 0,
        flagevalua: 0,
        usureg: nameUser,
        total: 6,
      });
      setIsUpdate(true);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleAprobar = () => {
    Swal.fire({
      title: 'Confirmación',
      html: '¿Estás seguro de <b>APROBAR</b> esta postulación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Atrás',
    }).then((result) => {
      if (result.isConfirmed) {
        handleSendPost();
        handleEvaluacion();
      }
    });
  };

  const handleDesaprobar = () => {
    Swal.fire({
      title: 'Confirmación',
      html: '¿Estás seguro de <b>DESAPROBAR</b> esta postulación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Atrás',
    }).then((result) => {
      if (result.isConfirmed) {
        handleRechazar;
      }
    });
  };

  useEffect(() => {
    if (ListPostulacion?.representantes) {
      setRepresent(ListPostulacion.representantes);
      setPuntosFocales(ListPostulacion.puntos_focales);
      setUnidadProductiva(ListPostulacion.unidades_productivas);
      setIsLoading(true);
    }
  }, [ListPostulacion]);

  return (
    <div className=" p-[1rem] bg-white  mb-[1.5rem]">
      <Toaster />
      <Accordion allowZeroExpanded>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="flex border-b-4 border-red-600 pb-4">
                <AiFillCaretRight className="text-4xl" />
                <span className="text-3xl">Postulacion</span>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="mt-4">
            <section className="ml-[2.5rem]">
              <article className="flex flex-wrap">
                <header className="w-full">
                  <span className="text-xl mr-8 font-bold">Registro: </span>
                  <Buttons className="text-[18px] bg-redMain text-white py-1">
                    Ver Documento
                  </Buttons>
                </header>
                <div className="grid grid-cols-3 gap-6 text-gray-500 mt-4">
                  <span>
                    <p>
                      Tipo de Documento: {ListPostulacion?.postulacion?.tipdoc}
                    </p>
                  </span>
                  <span>
                    <p>
                      Nº de documento: {ListPostulacion?.postulacion?.numdoc}
                    </p>
                  </span>
                  <span>
                    <p>
                      Nombre(s): {ListPostulacion?.postulacion?.nompernatural}
                    </p>
                  </span>
                  <span>
                    <p>
                      Apellidos:{' '}
                      {ListPostulacion?.postulacion?.apellidoPart +
                        ListPostulacion?.postulacion?.apellidoMart}
                    </p>
                  </span>
                  <span>
                    <p>Email: {ListPostulacion?.postulacion?.correoRegis}</p>
                  </span>
                  <span>
                    <p>
                      Nº de celular:{' '}
                      {ListPostulacion?.postulacion?.celularRegis}
                    </p>
                  </span>
                  <span>
                    <p>Cargo: {ListPostulacion?.postulacion?.cargo}</p>
                  </span>
                </div>
              </article>
              <article className="flex flex-wrap">
                <header className="w-full mt-8">
                  <span className="text-xl mr-4 font-bold">
                    Datos generales:{' '}
                  </span>
                </header>
                <div className="grid grid-cols-3 gap-6 text-gray-500 mt-4">
                  <span>
                    <p>
                      Tipo de actividad: {ListPostulacion?.postulacion?.tipdoc}
                    </p>
                  </span>
                  <span>
                    <p>
                      Persona jurídica: {ListPostulacion?.postulacion?.numdoc}
                    </p>
                  </span>
                  <span>
                    <p> RUC: {ListPostulacion?.postulacion?.nompernatural}</p>
                  </span>
                  <span>
                    <p>
                      Tamano de empresa:{' '}
                      {ListPostulacion?.postulacion?.apellidoPart +
                        ListPostulacion?.postulacion?.apellidoMart}
                    </p>
                  </span>
                  <span>
                    <p>
                      Nº de trabajadores:{' '}
                      {ListPostulacion?.postulacion?.correoRegis}
                    </p>
                  </span>
                  <span>
                    <p>
                      Cumplimiento social:{' '}
                      {ListPostulacion?.postulacion?.celularRegis}
                    </p>
                  </span>
                  <span>
                    <p>
                      Certificado en trabajo infantil:{' '}
                      {ListPostulacion?.postulacion?.cargo}
                    </p>
                  </span>
                  <span>
                    <p>Departamento: {ListPostulacion?.postulacion?.tipdoc}</p>
                  </span>
                  <span>
                    <p>Provincia: {ListPostulacion?.postulacion?.numdoc}</p>
                  </span>
                  <span>
                    <p>
                      {' '}
                      Distrito: {ListPostulacion?.postulacion?.nompernatural}
                    </p>
                  </span>
                  <span>
                    <p>
                      Docimicilio fiscal:{' '}
                      {ListPostulacion?.postulacion?.apellidoPart +
                        ListPostulacion?.postulacion?.apellidoMart}
                    </p>
                  </span>
                  <span>
                    <p>Exporta: {ListPostulacion?.postulacion?.correoRegis}</p>
                  </span>
                  <span>
                    <p>
                      Página web: {ListPostulacion?.postulacion?.celularRegis}
                    </p>
                  </span>
                  <span>
                    <p>Celular: {ListPostulacion?.postulacion?.cargo}</p>
                  </span>
                  <span>
                    <p>Teléfono: {ListPostulacion?.postulacion?.cargo}</p>
                  </span>
                </div>
              </article>
              <article className="flex flex-wrap">
                <header className="w-full mt-8 mb-4">
                  <span className="text-xl mr-4 font-bold">
                    Representante(s):{' '}
                  </span>
                </header>
                {isLoading && (
                  <TablasSimples columns={columnsRP} data={represent || []} />
                )}
              </article>
              <article className="flex flex-wrap">
                <header className="w-full mt-8 mb-4">
                  <span className="text-xl mr-4 font-bold">
                    Punto(s) Focale(s):{' '}
                  </span>
                </header>
                {isLoading && (
                  <TablasSimples
                    columns={columnsPF}
                    data={puntosFocales || []}
                  />
                )}
              </article>
              <article className="flex flex-wrap">
                <header className="w-full mt-8 mb-4">
                  <span className="text-xl mr-4 font-bold">
                    Unidad(es) Productiva(s):{' '}
                  </span>
                </header>
                {isLoading && (
                  <TablasSimples
                    columns={columnsUP}
                    data={unidadProductiva || []}
                  />
                )}
              </article>
              {ListPostulacion?.postulacion?.codetapa === 1 && (
                <>
                  <article className="mt-4">
                    <Buttons
                      className="text-white bg-redMain py-1 mr-[1rem]
                  HoverButtonRed w-[120px]"
                      onClick={handleAprobar}
                    >
                      Aprobar
                    </Buttons>
                    <Buttons
                      onClick={handleDesaprobar}
                      className=" bg-white HoverButton py-1"
                    >
                      Desaprobar
                    </Buttons>
                  </article>
                </>
              )}
            </section>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PostulacionView;
