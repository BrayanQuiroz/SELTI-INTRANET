import {useEffect, useState} from "react";
import Buttons from "../../components/Buttons.tsx";
import Modal from "../../components/Modal.tsx";
import Input from "../../components/Input.tsx";
import axios from "axios";
import config from '../../utils/urls.ts'



const UsuariosInternos = () => {

    const api = axios.create({
        baseURL: config.apiUrl
    })
    const [typeDocument, setTypeDocument] = useState([])

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

   useEffect(() => {
      document.title = "Usuarios internos";
   }, []);

   const [isModalOpen, setIsModalOpen] = useState(false);
   return (
      <div className="bg-white p-[1rem] mt-[4rem]">
         <div className="flex-between border-b-4 border-red-600">
            <h2 className="text-3xl">Administración de usuarios internos</h2>
            <Buttons className="text-white mb-2"
                     onClick={() => {setIsModalOpen(true)}}>
               Crear usuario
            </Buttons>
         </div>
         <div>
         </div>
          <Modal isOpen={isModalOpen}
                 textModal="Crear usuario interno"
                 ClassName="w-[570px]"
                 onClose={() => setIsModalOpen(false)}>
              <form className="mx-4 mt-4 flex flex-wrap">
                  <div className="w-full bg-white">
                      <Input
                          label="Tipo de usuario"
                          className="w-[220px]"
                      />
                  </div>
                  <div className="flex">
                      <Input
                          label="Tipo de documento"
                          className="mr-4"
                      />
                      <Input
                          label="Número de identidad"
                          className="m-[0]"
                      />
                      <Buttons className="text-white h-[31.6px] self-end p-[0]">
                          BUSCAR
                      </Buttons>
                  </div>
              </form>
          </Modal>
      </div>
   );
};

export default UsuariosInternos;