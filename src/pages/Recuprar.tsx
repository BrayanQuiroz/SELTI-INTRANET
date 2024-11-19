import {toast, Toaster} from "react-hot-toast";
import logoSelti from "../assets/log-selti.png";
import Input from "../components/Input.tsx";
import Buttons from "../components/Buttons.tsx";
import {useForm, SubmitHandler } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

type FormData = {
   usuario: string;
   correo: string;
}

const Recuperar = () => {

   const navigate = useNavigate();

   const {register,
      handleSubmit} = useForm<FormData>();

   const onSubmit: SubmitHandler<FormData> = (data) =>{
      const {usuario, correo} = data;

      if (!usuario || !correo) {
         toast.error('Ingrese usuario y correo');
         return;
      }
   }
   useEffect(() => {
      document.title = "Recuperar contraseña";
   }, []);

   return (
      <div className="w-full flex flex-col items-center">
         <Toaster/>
         <form onSubmit={handleSubmit(onSubmit)}
               className="w-[580px] flex flex-col items-center text-center bg-white rounded-xl">
            <div className="flex flex-col w-[400px] items-center border-b-4 border-red-600 mb-5">
               <img className="w-[90px] mt-4 self-center" src={logoSelti} alt=""/>
               <p className="text-xl pt-2 text-gray-600 font-bold">Sistema de Sello</p>
               <p className="text-xl pb-4 text-redMain font-bold">LIBRE DE TRABAJO INFANTIL</p>
            </div>
            <Input
               label="USUARIO"
               className="w-[400px]"
               id="usuario"
               type="text"
               {...register("usuario")}
            />
            <Input
               label="CORREO"
               className="w-[400px]"
               type="correo"
               id="correo"
               {...register("correo")}
            />

            <div className="flex flex-col items-center">
               < Buttons
                  className="mt-4 w-[400px] mb-8">
                  GENERAR CONTRASEÑA
               </Buttons>
               <a href=""
                  className="mb-6 text-sm"
                  onClick={()=> navigate("/")}
               >
                     <span className="text-blue-500 no-underline hover:underline hover:text-blue-700">ATRÁS
                        {/*<span className="text-2xl">&#129300;</span>*/}
                     </span>
               </a>
            </div>
         </form>
      </div>
   );
};

export default Recuperar;