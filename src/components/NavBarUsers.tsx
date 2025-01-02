import LogoSelti from '../assets/log-selti.png';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';

type TypeRol = {
  rol: string;
};

const NavBarUsers = ({ rol }: TypeRol) => {
  const { handleLogout, authData } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div className="w-full bg-white">
      <div className=" flex-between max-w-[1300px] mx-auto pt-3 pb-3">
        <div className="flex items-center  ">
          <figure className="w-[50px] mr-[1rem]">
            <img src={LogoSelti} alt="" />
          </figure>
          {rol === 'ADMINISTRADOR' ? (
            <>
              <a
                className="mr-[1rem] hover:text-[#b71c1c] cursor-pointer hover:underline efect-trans"
                onClick={() => navigate('/admin/gestionEdicion')}
              >
                Gestionar ediciones
              </a>
              <a
                className="cursor-pointer hover:text-[#b71c1c] hover:underline efect-trans"
                onClick={() => navigate('/admin/usuariosInternos')}
              >
                Usuarios internos
              </a>
            </>
          ) : null}
          {rol === 'SECRETARIA-TECNICA' ? (
            <>
              <a
                className="mr-[1rem] hover:text-[#b71c1c] cursor-pointer hover:underline efect-trans"
                onClick={() => navigate('/admin/gestionEdicion')}
              >
                Reportes
              </a>
            </>
          ) : null}
          {/*{ (rol === 'AUDITOR-EXTERNO' || rol === 'EQUIPO-TECNICO') ?*/}
          {/* <></>: null*/}

          {/*}*/}
        </div>
        <div className="flex items-center">
          <span className="mr-[1rem]">Rol: {authData?.roleName}</span>
          <span className="mr-[1rem]">Usuario: {authData?.usuarioName}</span>
          <button
            onClick={() => handleLogout()}
            className="cursor-pointer hover:text-[#b71c1c] hover:underline text-xl"
          >
            <FaArrowRightFromBracket />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBarUsers;
