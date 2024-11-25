import {useEffect} from "react";
import Buttons from "../../components/Buttons.tsx";

const UsuariosInternos = () => {

   useEffect(() => {
      document.title = "Usuarios internos";
   }, []);
   return (
      <div className="bg-white p-[1rem]">
         <div className="flex-between border-b-4 border-red-600">
            <h2 className="text-3xl">Administración de usuarios internos</h2>
            <Buttons className="text-white mb-2">
               Crear usuario
            </Buttons>
         </div>
         <div>

         </div>
      </div>
   );
};

export default UsuariosInternos;