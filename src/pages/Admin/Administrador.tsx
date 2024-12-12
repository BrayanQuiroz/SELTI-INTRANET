import NavBarUsers from '../../components/NavBarUsers.tsx';
import { Outlet, useLocation } from 'react-router-dom';

const Administrador = () => {
  const location = useLocation();
  return (
    <div className="w-full font-medium text-redMain">
      <NavBarUsers />
      <main className="max-w-[1200px]   mx-auto ">
        {location.pathname === '/admin/' && (
          <div className="w-[600px] pt-[6rem] mx-auto text-center">
            <p className="text-5xl pt-2 text-gray-600 font-bold">Bienvenido</p>
            <p className="text-4xl pt-2 text-gray-600 font-bold">Sistema de Sello</p>
            <p className="text-4xl pb-4 text-redMain font-bold">
              LIBRE DE TRABAJO INFANTIL
            </p>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default Administrador;
