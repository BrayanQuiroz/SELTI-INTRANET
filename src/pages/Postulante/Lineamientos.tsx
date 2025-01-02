import Lineamiento from '../../components/Lineamiento.tsx';


const Lineamientos = () => {

  const contenidoLinea = 'Contar con un marco institucional que resalte el compromiso de la persona jurídica de cumplir con la normativa aplicable al trabajo infantil'
  const contenidoEstan = 'La persona jurídica expresa formalmente su compromiso con la prevención y erradicación del trabajo infantil\n' +
    'Adjuntar documentos(MÁX. 5MBs)'

  return (
    <section className='p-6 mt-[2rem] bg-white'>
      <header className='border-b-4 border-red-600 mb-8'>
        <h2 className="text-3xl font-bold mb-2">
          Evaluación del cumplimiento de lineamientos y estándares.
        </h2>
      </header>
      <Lineamiento
        lineamiento='Lineamiento 1'
        estandar='Estándar 1'
        contenidoLinea={contenidoLinea}
        contenidoEstan={contenidoEstan}
        active={0}
      />
      <Lineamiento
        lineamiento='Lineamiento 2'
        estandar='Estándar 2.1'
        contenidoLinea={contenidoLinea}
        contenidoEstan={contenidoEstan}
        estandarDos='Estándar 2.2'
        contenidoEstanDos={contenidoEstan}
        estandarTres='Estándar 2.3'
        contenidoEstanTres={contenidoEstan}
        estandarCuatro='Estándar 2.4'
        contenidoEstanCuatro={contenidoEstan}
        active={4}
      />
      <Lineamiento
        lineamiento='Lineamiento 3'
        estandar='Estándar 3.1'
        contenidoLinea={contenidoLinea}
        contenidoEstan={contenidoEstan}
        active={2}
        estandarDos='Estándar 3.2'
        contenidoEstanDos={contenidoEstan}
      />
      <Lineamiento
        lineamiento='Lineamiento 4'
        estandar='Estándar 4.1'
        contenidoLinea={contenidoLinea}
        contenidoEstan={contenidoEstan}
        active={0}
      />
      <Lineamiento
        lineamiento='Lineamiento 5'
        estandar='Estándar 5.1'
        contenidoLinea={contenidoLinea}
        contenidoEstan={contenidoEstan}
        active={0}
      />
    </section>
  );
};

export default Lineamientos;