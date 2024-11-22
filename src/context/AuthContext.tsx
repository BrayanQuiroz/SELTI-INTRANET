import  {createContext} from "react";

export type AutData = {
   userId: string | null;
   usernameid: string | null;
   nameuser: string | null;
   roleName: string | null;
   usuarioName: string | null;
   rucUsuario: string | null;
   correo: string | null;
   codigoEdicion: string | null;
   codigoEtapa: string | null;
   flaglinea: string | null;
}

export type ContextType = {
   authData?: AutData;
   AuthDataUpdate: (newAuthData: Partial<AutData>) => void;
   handleLogout: () => void;
}

export const AuthContext = createContext<ContextType>({
   AuthDataUpdate: () => {},
   handleLogout: () => {}
});
