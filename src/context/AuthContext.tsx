import {createContext, useEffect, useState} from "react";


export const AuthContext = createContext();

export const AuthProvider =({children})=>{
   const [authData, setAuthData] = useState({
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
      AuthDataUpdate: () => {},
      handleLogout: () => {},
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

   const AuthDataUpdate = (newAuthData) =>{
      setAuthData((prevAuthData)=>(
         {
            ...prevAuthData,
            ...newAuthData,
         }));
   }

   const handleLogout = () => {

      setAuthData({
         usernameid: null,
         nameuser: null,
         roleName: null,
         AuthDataUpdate(): void {
         }, handleLogout(): void {
         },
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

   return (
      <AuthContext.Provider value={[authData, setAuthData, handleLogout]}>
         {children}
      </AuthContext.Provider>
   )
}