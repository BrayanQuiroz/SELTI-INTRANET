import Lineamiento from '../../components/Lineamiento.tsx';
import {
  contenidoLinea,
  contenidoEstan,
} from '../../utils/lineamientosText.ts';
import { useState } from 'react';

const Lineamientos = () => {
  const [file, setFile] = useState<number>();

  return (
    <section className="p-6 mt-[2rem] bg-white">
      <header className="border-b-4 border-red-600 mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Evaluación del cumplimiento de lineamientos y estándares.
        </h2>
      </header>
      <Lineamiento
        lineamiento="Lineamiento 1"
        estandar="Estándar 1"
        contenidoLinea={contenidoLinea}
        contenidoEstan={contenidoEstan}
      />
    </section>
  );
};

export default Lineamientos;
