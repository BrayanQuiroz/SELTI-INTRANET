import Buttons from '../../components/Buttons.tsx';

const AsistenciaTecnica = () => {
  return (
    <section className='p-6 mt-[2rem] bg-white'>
      <header className='border-b-4 border-red-600 mb-8'>
          <h2 className="text-3xl font-bold mb-2">
            Asistencia Técnica
          </h2>
      </header>
      <article>
        <p className='text-xl mb-4'>
          Descargar Archivo de Asistencia Técnica:
        </p>
        <Buttons
          className='text-white bg-redMain py-1 mr-[1rem] HoverButtonRed'>
          DESCARGAR
        </Buttons>
      </article>

    </section>
  );
};

export default AsistenciaTecnica;