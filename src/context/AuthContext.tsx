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
   isReady:  boolean;
}

export const defaultAuthData: AutData = {
   userId: null,
   usernameid: null,
   nameuser: null,
   roleName: null,
   usuarioName: null,
   rucUsuario: null,
   correo: null,
   codigoEdicion: null,
   codigoEtapa: null,
   flaglinea: null,
};


export const AuthContext = createContext<ContextType>({
   isReady: false,
   authData: defaultAuthData,
   AuthDataUpdate: () => {},
   handleLogout: () => {}
});
