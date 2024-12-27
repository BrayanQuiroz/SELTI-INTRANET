import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircleOutline  } from "react-icons/io";


type PropsChecks ={
  onClick?: () => void;
  isActive?: boolean;
  isTrue?: boolean;
  evaluacionUno?: boolean;
  isNeutro?: boolean;
}

export const Evaluacion = ({isTrue,onClick, evaluacionUno}:PropsChecks) =>{
  return (
    <div
      className='cursor-pointer'
      onClick={onClick}
    >
      <FaRegCheckCircle className={`
        ${isTrue ? 'text-[#5CB85C]' : 'text-[#CCC]'}
        text-4xl
      `} />
    </div>

  )
}

export const EvaluacionIsNot = ({isTrue,onClick, isNeutro}:PropsChecks) =>{
  return (
    <div
      className='cursor-pointer'
      onClick={onClick}
    >
      <IoMdCloseCircleOutline className={`
        ${isTrue || isNeutro ? 'text-[#CCC]' : 'text-[#FF0000]'}
        text-[44px]
      `} />
    </div>

  )
}

// ${evaluacionUno ? 'evaluacion-class' : ''}