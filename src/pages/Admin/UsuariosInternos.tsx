import {useEffect, useState} from "react";
import Buttons from "../../components/Buttons.tsx";
import Modal from "../../components/Modal.tsx";
import Input from "../../components/Input.tsx";
import axios from "axios";
import config from '../../utils/urls.ts'
import Selects from "../../components/Selects.tsx";


type TransFormedData = {
   label: string;
   value: string;
}



type apiDataState = {
   descripcion: string;
   codigo: string;
   DESPER: string;
   CODPER: string;
}


const UsuariosInternos = () => {



    const api = axios.create({
        baseURL: config.apiUrl
    })
    const [typeDocument, setTypeDocument] = useState<apiDataState[]>([])

    useEffect(() => {
        const ListType = async ()=>{
            try{
                const response = await api.get('/apiListar/TipoDocumento/')
                setTypeDocument(response.data)
                console.log(response.data)
            }catch (e) {
                console.log(e)
            }
        }
        ListType();
    }, []);

    const dataTransformed: TransFormedData[] = typeDocument.map((item)=>({
       label: item.descripcion,
       value: item.codigo,
       })
    )

   useEffect(() => {
      document.title = "Usuarios internos";
   }, []);

   const [isModalOpen, setIsModalOpen] = useState(false);
   return (
       <div className="pt-[4rem]">
           <div className="bg-white p-[1rem] ">
               <div className="flex-between border-b-4 border-red-600 pb-2">
                   <h2 className="text-3xl">Administración de usuarios internos</h2>
                   <Buttons className="text-white py-1"
                            onClick={() => {
                                setIsModalOpen(true)
                            }}>
                       Crear usuario
                   </Buttons>
               </div>
               <div>
               </div>
               <Modal isOpen={isModalOpen}
                      textModal="Crear usuario interno"
                      ClassName="w-[580px]"
                      onClose={() => setIsModalOpen(false)}>
                   <form className="mx-4 mt-4 flex flex-wrap">
                       <div className="w-full bg-white mb-[0.8rem]">
                           <Selects
                               options={dataTransformed}
                               placeholder="Seleccione tipo de usuario"
                               labelP="Tipo de usuarios"
                               classNameDiv="w-[230px]"
                           />

                       </div>
                       <div className="flex ">
                          <Selects
                             options={dataTransformed}
                             placeholder="Seleccione documento"
                             labelP="Tipo de usuarios"
                             classNameDiv="w-[230px] mr-[1rem]"
                          />
                           <Input
                               label="Número de identidad"
                               className="m-[0]"
                           />
                           <Buttons className="text-white h-[31.6px] self-end">
                               Buscar
                           </Buttons>
                       </div>
                   </form>
               </Modal>
           </div>
       </div>

   );
};

export default UsuariosInternos;