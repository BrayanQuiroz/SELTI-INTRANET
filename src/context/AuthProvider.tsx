import React, {ReactNode, useEffect, useState} from "react";
import {AuthContext, AutData} from "./AuthContext.tsx";

export const AuthProvider: React.FC<{children: ReactNode}> = ({children})=>{
   const [authData, setAuthData] = useState<AutData>({
      userId:null,
      usernameid: null,
      nameuser: null,
      roleName: null,
      usuarioName: null,
      rucUsuario: null,
      correo: null,
      codigoEdicion:null,
      codigoEtapa: null,
      flaglinea: null,

   })

   useEffect( ()=>{
         const storeAuthData = localStorage.getItem('authData');
         if (storeAuthData){
            setAuthData(JSON.parse(storeAuthData));
         }
      }
      ,[])

   useEffect(() => {
      localStorage.setItem('authData', JSON.stringify(authData));
   }, [authData]);

   const AuthDataUpdate = (newAuthData: Partial<AutData>) =>{
      setAuthData((prevAuthDataUpdate)=>(
         {
            ...prevAuthDataUpdate,
            ...newAuthData,
         }));
   }


   const handleLogout = () => {

      setAuthData({
         usernameid: null,
         nameuser: null,
         roleName: null,
         userId: null,
         usuarioName: null,
         rucUsuario: null,
         correo: null,
         codigoEdicion:null,
         codigoEtapa: null,
         flaglinea: null
      });

      localStorage.removeItem('authData');
   };
   return(
      <AuthContext.Provider value={{ authData, AuthDataUpdate, handleLogout }}>
         {children}
      </AuthContext.Provider>
   )
}

