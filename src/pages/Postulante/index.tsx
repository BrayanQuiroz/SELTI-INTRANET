import NavBarUsers from '../../components/NavBarUsers.tsx';
import Proceso from './Proceso.tsx';
import AsistenciaTecnica from './AsistenciaTecnica.tsx';
import Lineamientos from './Lineamientos.tsx';

const Postulante = () => {
  return (
    <div className="w-full font-medium text-redMain ">
      <NavBarUsers rol="POSTULANTE" />
      <main className="max-w-[1300px] mx-auto">
        <Proceso />
        <AsistenciaTecnica />
        <Lineamientos />
      </main>
    </div>
  );
};

export default Postulante;