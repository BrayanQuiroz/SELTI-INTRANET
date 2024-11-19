
import Input from "../components/Input.tsx";
import Buttons from "../components/Buttons.tsx";
import logoSelti from "../assets/log-selti.png"
import {useForm, SubmitHandler } from "react-hook-form";
import {toast, Toaster} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "../components/Modal.tsx";
import config from "../utils/urls.ts"
import axios,{ AxiosError} from "axios";
import {jwtDecode} from "jwt-decode";

type FormData = {
   usuario: string;
   password: string;
   resetPass: string;
   resetRepit: string;
}

const Home = () =>{

   const api = axios.create ({
      baseURL:config.apiUrl
   })

   const navigate = useNavigate();

   const {register,
      handleSubmit} = useForm<FormData>();

   const [isModalOpen, setIsModalOpen] = useState(false);

   const onSubmit: SubmitHandler<FormData> = async (data) =>{
      const {usuario, password} = data;

      if (!usuario || !password) {
         toast.error('Ingrese usuario y contraseña', {
            style: {
               background: '#333',
               color: '#fff',
            },
         });
         return;
      }

      try{
         const response = await api.post("auth/login/",{
            usuario: usuario ,
            passusu: password,
         })

         const {token} = response.data;
         const decodedToken = jwtDecode(token)
         const ValueReset = decodedToken.ValueReset;

         if (ValueReset){
            setIsModalOpen(true);
         }
      }catch(error){
         if (error instanceof AxiosError) {
            console.log(error.response?.data.error)
            toast.error(error.response?.data.error, {
               style: {
                  background: '#333',
                  color: '#fff',
               },
            })
         }
      }
   }

   const handleUpdatePassword: SubmitHandler<FormData> = async (data) =>  {

      const {resetPass , resetRepit} = data;

      const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{11,}$/;

      if(resetPass !== resetRepit){
         toast.error("Las contraseñas no son iguales.", {
            style: {
               background: '#333',
               color: '#fff',
            },
         });
         return;
      }

      if(!regexPassword.test(resetRepit)){
         toast.error("La contraseña debe cumplir los requisitos.", {
            style: {
               background: '#333',
               color: '#fff',
            },
         });
         return;
      }
   }

   useEffect(() => {
      document.title = "Iniciar sesión";
   }, []);

   return (
         <div className="w-full flex flex-col items-center ">
            <Toaster />
            <form onSubmit={handleSubmit(onSubmit)}
                  className="w-[580px] flex flex-col items-center text-center bg-white rounded-xl">
               <div className="flex flex-col w-[400px] items-center border-b-4 border-red-600 mb-5">
                  <img className="w-[90px] mt-4 self-center" src={logoSelti} alt=""/>
                  <p className="text-xl pt-2 text-gray-600 font-bold">Sistema de Sello</p>
                  <p className="text-xl pb-4 text-redMain font-bold">LIBRE DE TRABAJO INFANTIL</p>
               </div>
               <Input
                  label="Usuario"
                  className="w-[400px]"
                  id="usuario"
                  type="text"
                  {...register("usuario")}
               />
               <Input
                  label="Contraseña"
                  className="w-[400px]"
                  type="password"
                  id="password"
                  {...register("password")}
               />

               <div className="flex flex-col items-center">
                  < Buttons
                     // onClick={() => setIsModalOpen(true)}
                     className="mt-4 w-[400px] mb-8 text-white">
                     INICIAR SESIÓN
                  </Buttons>
                  <a href=""
                     className="mb-6 text-sm"
                     onClick={() => navigate("/recuperar")}
                  >
                     <span className="text-blue-500 no-underline hover:underline hover:text-blue-700">
                        ¿HAS OLVIDADO TU CONTRASEÑA?
                        <span className="text-2xl">&#129300;</span>
                     </span>
                  </a>
               </div>
            </form>

            <Modal isOpen={isModalOpen}
                   textModal="Actualizar contraseña"
                   onClose={() => setIsModalOpen(false)}>

               <form onSubmit={handleSubmit(handleUpdatePassword)}>
                  <Input
                     label="Nueva contraseña"
                     className="w-[400px]"
                     type="password"
                     id="resetPass"
                     {...register("resetPass")}
                  />
                  <Input
                     label="Repita nueva contraseña"
                     className="w-[400px]"
                     type="password"
                     id="resetRepit"
                     {...register("resetRepit")}
                  />
                  <div className="w-full flex justify-center items-center">
                     <p className="w-[400px] text-[15px]">
                        La contraseña debe tener 12 dígitos y al menos una mayúscula, un carácter especial y un número
                     </p>
                  </div>
                  <div className="w-full flex justify-end p-4">
                     <Buttons
                        className="text-sm mr-4 text-white"
                     >
                        ACTUALIZAR
                     </Buttons>
                     <Buttons
                        className="text-redMain text-sm bg-white border border-redMain  hover:bg-redMain hover:text-white transition "
                        onClick={() => setIsModalOpen(false)}
                     >
                        CANCELAR
                     </Buttons>
                  </div>
               </form>


            </Modal>
         </div>
   );
}

export default Home;