import InputFile from './InputFile.tsx';
import Input from './Input.tsx';

type Props = {
  lineamiento: string;
  estandar: string;
  contenidoLinea:string;
  contenidoEstan:string;
  estandarDos?: string;
  contenidoEstanDos?:string;
  estandarTres?: string;
  contenidoEstanTres?:string
  estandarCuatro?: string;
  contenidoEstanCuatro?:string
  active: number;
}

const Lineamiento = ({
                       lineamiento,
                       estandar,
                       contenidoLinea,
                       contenidoEstan,
                       active,
                       estandarDos,
                       contenidoEstanDos,
                       estandarTres,
                       contenidoEstanTres,
                       estandarCuatro,
                       contenidoEstanCuatro,
}:Props) => {
  return (
    <article>
      <div>
        <p className='text-xl'>{lineamiento}:</p>
        <p className='text-gray-600'>{contenidoLinea}</p>
      </div>
      <div className='ml-8'>
        <p className="text-xl">{estandar}:</p>
        <div className="text-gray-600 mb-4">{contenidoEstan}</div>
        <InputFile
          className='mb-4'
        />
        <Input
          label='Comentarios'
        />
      </div>
      { active >= 2 &&(
        <>
          <div className='ml-8'>
            <p className="text-xl">{estandarDos}:</p>
            <div className="text-gray-600 mb-4">{contenidoEstanDos}</div>
            <InputFile
              className='mb-4'
            />
            <Input
              label='Comentarios'
            />
          </div>
        </>
      )
      }
      { active >= 3 &&(
        <>
          <div className='ml-8'>
            <p className="text-xl">{estandarTres}:</p>
            <div className="text-gray-600 mb-4">{contenidoEstanTres}</div>
            <InputFile
              className='mb-4'
            />
            <Input
              label='Comentarios'
            />
          </div>
        </>
      )
      }
      { active >= 4 &&(
        <>
          <div className='ml-8'>
            <p className="text-xl">{estandarCuatro}:</p>
            <div className="text-gray-600 mb-4">{contenidoEstanCuatro}</div>
            <InputFile
              className='mb-4'
            />
            <Input
              label='Comentarios'
            />
          </div>
        </>
      )
      }
    </article>
  );
};

export default Lineamiento;