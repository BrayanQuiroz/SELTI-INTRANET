import { useEffect, useState } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { FaSearchPlus } from "react-icons/fa";
import {
  AsistenciaCumplido,
  AsistNoCumpl,
  AsistProgramada,
  AsistReprogra, AsistXProgramar, Auditor, EnviarOtor, EvaluacionReque, InfOtorgado, InfRechazado,
  Postualcion,
  ReviLinea,
} from '../utils/States.tsx';
import Modal from './Modal.tsx';
import Selects from './Selects.tsx';
import axios from 'axios';
import config from '../utils/urls.ts';
import { toast,Toaster } from 'react-hot-toast';

interface Column<T> {
  header: string;
  key: keyof T;
}

type TransFormedData = {
  label: string;
  value: string| number;
};

type apiDataState ={
  codusu?: number;
  correo?: string;
  flagestado?: number;
  nombre?: string;
  rol?: string;
  usuario?: string
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

function Table<T>({ columns, data }: TableProps<T>) {

  const api = axios.create({
    baseURL: config.apiUrl,
  });

  const [usersList, setUsersList] = useState<apiDataState[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const isTrueCod = data.some((item) => 'codpostul' in item);


  const formattedData = data.map((item)=>{

    const renderIconEstado = ()=>{

      const { codetapa, flaglinea,flagestandar, ruc} = item;

      switch (codetapa){
        case 1:
          return <Postualcion />;
        case 2:
          if(flagestandar === 1){
            return <AsistProgramada />;
          }else if(flagestandar == 2){
            return <AsistReprogra />
          }else if(flagestandar == 3){
            return <AsistNoCumpl />
          }else if(flagestandar == 5){
            return <AsistenciaCumplido />
          }else{
            return <AsistXProgramar />
          }
        case 3:
          if (flaglinea == 2) {
            return  <ReviLinea />
          }
          break;
        case 4:
          return <Auditor />;
        case 5:
          return <EnviarOtor />;
        case 6:
          return <InfOtorgado />;
        case 7:
          return <InfRechazado />;
        case 8:
          return <EvaluacionReque />;
        default:
          return null;
      }
    }

    const renderEtapa = ()=>{

      const { codetapa} = item;

      switch (codetapa) {
        case 1:
          return "Postulación";
        case 2:
          return "Asistencia Técnica";
        case 3:
          return "Evaluación del cumplimiento de linea. y estánd. ";
        case 4:
          return "Verificación de no uso de mano de obra  infantil.";
        case 5:
          return "Enviar Otorgamiento";
        case 6:
          return "Otorgamiento del Reconocimiento SELTI";
        case 7:
          return "Rechazado";
        case 8:
          return "Evaluación de requisitos";
        default:
          return null;
      }
    }
console.log(item.nombre)
    const result = {
      codpostul: `SELTI-${item.codpostul}`,
      ruc: item.ruc,
      nombre: item.nombre,
      codetapa: renderEtapa(item.codetapa),
      flaglinea: renderIconEstado(item.codetapa),
      acciones: item.flagestado,
    }
    return result;
  })

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDataPros = formattedData.slice(startIndex, endIndex)
  const currentDataPre = data.slice(startIndex, endIndex);
  const currentData = isTrueCod ? currentDataPros:currentDataPre;


  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }


  const handleChange =(value: number | string)=>{
    toast.error(` el valor gaa${value}`);
  }


  const [modal, setModal] = useState(false);

  const [modalData, setModalData] = useState({
    codpostul:'',
    codusu: 0,
    ruc: '',
  });

  const handleAsignar = async ()=>{
    let text:string = modalData.codpostul;
    let codpostul = text.split("-")[1];

    try {
      const response = await api.put("/Update/Tecnico/",{
        codpostul: codpostul,
        codusu: modalData.codusu,
      })

      if (response.status === 200){
        toast.success('Postualación asiganada', {
          style: { background: '#333', color: '#fff' },
        })
        setModal(false);
      }
    }catch (e){
      console.log(e);
    }
  }

  const handleAsigPost = (id:string, ruc:string, codusu:number)=>{
    setModal(true)
    setModalData({
      codpostul: id,
      ruc: ruc,
      codusu: codusu
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/apiListar/EquipoTecnico/");
        setUsersList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      }
    };
    fetchData();
  }, []);

  const transformData: TransFormedData[] = usersList.map((item)=>({
    label: `${item.nombre} - ${item.rol}`,
    value: item.codusu
  }))

  return (
    <div className="border border-gray-200">
      <table className="min-w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentData.map((row, rowIndex) => (
            <tr
              key={startIndex + rowIndex}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                >
                  {col.key === 'acciones'?
                    <div className="flex">
                      <button
                        onClick={()=>handleAsigPost(row.codpostul, row.ruc, row.codusu)}
                        className="IconTheme mr-4">
                        <FaUserAlt  />
                      </button>

                      <FaSearchPlus className="IconTheme" />
                    </div>
                  :row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center py-2 px-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Anterior
        </button>

        <div className="flex space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageClick(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {number}
            </button>
          ))}
        </div>
        <Toaster />
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Siguiente
        </button>
      </div>
      <Modal
        textModal='Asignación de postulación'
        ClassName="w-[515px]"
        onAccept={handleAsignar}
        onCancel={() => setModal(false)}
        isOpen={modal}>
        <div className="mx-4 mt-4 flex flex-wrap  pb-[1rem]">
          <div className='w-full'>
            <p>Se asigna la postulación del RUC: {modalData.ruc}</p>
          </div>
          <Selects
            placeholder='Selecione usuario'
            options={transformData}
            labelP="Asignar:"
            onChange={(value : string| number)=>{
                setModalData({
                  ...modalData,
                  codusu: value,
                })
            }}
          />

        </div>

      </Modal>
    </div>
  );
}

export default Table;
