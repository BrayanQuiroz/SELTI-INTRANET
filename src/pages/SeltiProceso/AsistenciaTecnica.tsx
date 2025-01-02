import toast, { Toaster } from 'react-hot-toast';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { AiFillCaretRight } from 'react-icons/ai';
import Buttons from '../../components/Buttons.tsx';
import Input from '../../components/Input.tsx';
import InputFile from '../../components/InputFile.tsx';
import { useState, useEffect, useContext } from 'react';
import config from '../../utils/urls.ts';
import axios from 'axios';
import { handlAsistTec } from '../../utils/functions/handlAsistTec.ts';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext.tsx';


type Props = {
  codpostul: number;
};

const AsistenciaTecnica = ({ codpostul }: Props) => {
  const api = axios.create({
    baseURL: config.apiUrl,
  });

  const {authData} = useContext(AuthContext)

  const roleName = authData?.roleName;
  const usuarioName = authData?.usuarioName;


  const [fecha, setFecha] = useState<string>('');

  const [ListPost, SetListPost] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const Listar = async () => {
      try {
        const response = await api.get(`/apiListar/VistaPostulacion/${codpostul}/`);
        SetListPost(response.data);
        console.log('Se esta llamando a Listar' + isUpdate);
      } catch (e) {
        console.error('Error al obtener los roles:', e);
      }
    };
    Listar();
  }, [isUpdate]);

  const ruc = ListPost?.postulacion?.ruc;
  const correo = ListPost?.postulacion?.correo;

const handlAprobar = ()=>{
  Swal.fire({
    title: 'Confirmación',
    html: '¿Estás seguro de <b>Aprobar</b> la Asistencia técnica?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Atrás',
  }).then((result) => {
    if (result.isConfirmed) {
      let condicion = 3;
      let flagestandar = 5;
      let successMessage = 'Se aprobo Asistencia Técnica.';

      handlAsistTec({
        ruc,
        condicion,
        flagestandar,
        successMessage,
        correo,
        fecha
      })
    }
  });
}

const handlDesaprobar = ()=>{
  Swal.fire({
    title: 'Confirmación',
    html: '¿Estás seguro de <b>Desaprobar</b> la Asistencia técnica?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Atrás',
  }).then((result) => {
    if (result.isConfirmed) {
      let condicion = 3;
      let flagestandar = 5;
      let successMessage = 'Se desaprobo Asistencia Técnica.';
      handlAsistTec({
        ruc,
        condicion,
        flagestandar,
        successMessage,
        correo,
        fecha
      })
    }
  })
}

  const [isTrueFile, setIsTrueFile] = useState(false);
  const [selectFile, setSelectFile] = useState<File | null>(null);

const handleChange = (e)=>{
  const fileInput = e.target;
  setIsTrueFile(fileInput.files.length > 0)

  if (fileInput.files.length > 0){
    setSelectFile(fileInput.files[0]);
  }else{
    setIsTrueFile(true);
  }
}

  const handlSendFecha = async()=>{
    if (fecha === "" || fecha === null){
      toast.error("Debe agregar una fecha.");
      return;
    }else{

      let  condicion = 1;
      let flagestandar = 2;
      let successMessage = 'Fecha enviada correctamente.'

      await handlAsistTec({
        ruc,
        condicion,
        flagestandar,
        successMessage,
        correo,
        fecha
      })
    }
  }

  const InsertLineaAndComent = async ()=>{
    try {
      await api.put("/Update/CodEsatos/", {
        rol: roleName,
        codetapa: 3,
        ruc: ruc,
      });

      await api.post('/Create/LineamientoEstado/',{
        ruc: ruc,
        lineauno: 0,
        lineados: 0,
        lineatres: 0,
        lineacuatro: 0,
        lineacinco: 0,
        lineaseis: 0,
        lineasiete: 0,
        lineaocho: 0,
        lineanueve: 0,
        usureg:usuarioName,
        tipousu: 2,
        total: 9
      })

      await api.post('Create/Comentarios/',{
        ruc: ruc,
        cunoest: 0,
        cdosest: 0,
        ctresest: 0,
        ccuatroest: 0,
        ccincoest: 0,
        cseisest: 0,
        csieteest: 0,
        cochoest: 0,
        cnueveest: 0,
        usureg:usuarioName,
        tipousu: 2,
      })

      toast.success("Se envío y aprobó el archivo de asistencia ténica ");
    }catch (e){

    }
  }

  const handlFile = async ()=>{
    try{
      if (selectFile){
        const formData = new FormData();

        formData.append('ruc', ruc);
        formData.append('file', selectFile)
        await api.post("/Update/Estandar/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        await InsertLineaAndComent();
      }
    }catch (e){
      console.log(e)
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
                <span className="text-3xl">Asistencia Técnica</span>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel className="mt-4">
            {ListPost?.postulacion?.codetapa === 8 && (
              <section className="ml-[2.5rem]">
                <header>
                <span className="text-2xl font-bold">
                  Subir archivo de Asistencia Técnica:
                </span>
                </header>
                <article className="mt-4 flex">
                  {ListPost?.postulacion?.flagestandar === 5 && (
                    <InputFile
                      // className="w-[206px] mr-4"
                      onChange={handleChange}
                      isLabel={isTrueFile}
                    />
                  )}
                  {isTrueFile && (
                    <Buttons
                      className="text-white bg-redMain ml-4
                    py-1 mr-[1rem] HoverButtonRed h-[44px]"
                      onClick={handlFile}>
                      SUBIR ARCHIVO
                    </Buttons>
                  )}

                  {ListPost?.postulacion?.flagestandar === 2 && (
                    <>
                      <Buttons
                        className="text-white bg-redMain py-1 mr-[1rem] HoverButtonRed"
                        onClick={handlAprobar}
                      >
                        APROBAR
                      </Buttons>
                      <Buttons
                        className=" bg-white HoverButton py-1"
                        onClick={handlDesaprobar}
                      >
                        DESAPROBAR
                      </Buttons>
                    </>
                  )}
                </article>
                {ListPost?.postulacion?.flagestandar === 0 && (
                  <article className="flex items-end">
                    <Input
                      className="h-[44px]"
                      label="Fecha de Asistencia técnica:" />
                    <Buttons
                      className="text-white bg-redMain py-1 mr-[1rem] HoverButtonRed h-[44px]">
                      ENVIAR CORREO
                    </Buttons>
                  </article>
                )}

                {ListPost?.postulacion?.flagestandar === 2 && (
                  <article className="flex items-end mt-4">
                    <Input
                      className="h-[44px]"
                      label="Cambiar fecha de asistencia técnica:"
                      onChange={(e) => {
                        setFecha(e.target.value);
                      }}
                    />
                    <Buttons
                      className="text-white bg-redMain py-1 mr-[1rem] HoverButtonRed h-[44px]"
                      onClick={handlSendFecha}
                    >
                      ENVIAR CORREO
                    </Buttons>
                  </article>
                )}
              </section>
            )}

          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AsistenciaTecnica;
