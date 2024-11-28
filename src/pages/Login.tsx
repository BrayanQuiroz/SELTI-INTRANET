
import Input from "../components/Input.tsx";
import Buttons from "../components/Buttons.tsx";
import logoSelti from "../assets/log-selti.png"
import {useForm, SubmitHandler } from "react-hook-form";
import {toast, Toaster} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Modal from "../components/Modal.tsx";
import config from "../utils/urls.ts"
import axios,{ AxiosError} from "axios";
import {jwtDecode} from "jwt-decode";
import {AuthContext} from "../context/AuthContext.tsx";

type FormData = {
   usuario: string;
   password: string;
   resetPass: string;
   resetRepit: string;
}

const Login = () =>{

   const api = axios.create ({
      baseURL:config.apiUrl
   })

   const navigate = useNavigate();

   const {AuthDataUpdate} = useContext(AuthContext);

   const {register,
      handleSubmit} = useForm<FormData>();

   const [isModalOpen, setIsModalOpen] = useState(false);

   const onSubmit: SubmitHandler<FormData> = async (data) =>{
      const {usuario, password} = data;

      if (!usuario || !password) {
         toast.error('Ingrese usuario y contraseña', {
            style: {background: '#333',color: '#fff'},
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
         const userId = decodedToken.id;
         const usernameid = decodedToken.numdoc;
         const usuarioName = decodedToken.usuario;
         const nameuser = decodedToken.nombre;
         const rucUsuario = decodedToken.ruc;
         const roleName = decodedToken.rol;
         const codigoEtapa = decodedToken.codigoEtapa;
         const codigoEdicion = decodedToken.codigoEdicion;
         const flaglinea = decodedToken.flaglinea;
         const ValueReset = decodedToken.ValueReset;

         AuthDataUpdate({
            userId,
            usernameid,
            nameuser,
            rucUsuario,
            roleName,
            usuarioName,
            codigoEdicion,
            codigoEtapa,
            flaglinea,
         })

         console.log(roleName)

         switch (roleName){
            case "ADMINISTRADOR":
               console.log("entre")
               navigate("/admin/");
               break;
            case "POSTULANTE":
               navigate("/postulante/")
               break;
            case "EQUIPO-TECNICO":
            case "SECRETARIA-TECNICA":
            case "AUDITOR-EXTERNO":
               navigate("/seltiProceso/");
         }

         if (ValueReset){
            setIsModalOpen(true);
         }

      }catch(error){
         if (error instanceof AxiosError) {
            toast.error(error.response?.data.error, {
               style: {background: '#333',color: '#fff'},
            })
         }
      }
   }

   const handleUpdatePassword: SubmitHandler<FormData> = async (data) =>  {

      const {resetPass , resetRepit, usuario} = data;

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

      try{
         await api.put('/Update/SeltiResetPass/',{
            usuario: usuario,
            passusu: resetPass
         })
         setIsModalOpen(false);
         toast.success("Tu contraseña fue cambiada exitosamente")
      }catch (error) {
         if (error instanceof AxiosError) {
            toast.error(error.response?.data.error, {style: {background: '#333',color: '#fff',},
            })
         }
      }
   }

   useEffect(() => {
      document.title = "Iniciar sesión";
   }, []);

   return (
         <div className="w-full flexCenter h-[calc(100vh-157px)] justify-center">
            <Toaster />
            <form onSubmit={handleSubmit(onSubmit)}
                  className="w-[530px] flexCenter text-center bg-white rounded-xl">
               <div className="flexCenter w-[350px]  border-b-4 border-red-600 mb-4">
                  <img className="w-[90px] mt-4 self-center" src={logoSelti} alt=""/>
                  <p className="text-xl pt-2 text-gray-600 font-bold">Sistema de Sello</p>
                  <p className="text-xl pb-4 text-redMain font-bold">LIBRE DE TRABAJO INFANTIL</p>
               </div>
               <div className="">
                  <Input
                      label="Usuario"
                      className="w-[350px] mb-2"
                      id="usuario"
                      type="text"
                      {...register("usuario")}
                  />
                  <Input
                      label="Contraseña"
                      className="w-[350px]"
                      type="password"
                      id="password"
                      {...register("password")}
                  />
               </div>


               <div className="flex flex-col items-center">
                  < Buttons
                     // onClick={() => setIsModalOpen(true)}
                     className="mt-4 w-[350px] mb-8 text-white">
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
                     className="w-[400px] items-center"
                     type="password"
                     id="resetPass"
                     {...register("resetPass")}
                  />
                  <Input
                     label="Repita nueva contraseña"
                     className="w-[400px] items-center"
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

export default Login;