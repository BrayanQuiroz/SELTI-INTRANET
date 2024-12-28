import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircleOutline  } from "react-icons/io";


type PropsChecks ={
  onClick?: () => void;
  isActive?: boolean;
  isTrue?: boolean;
  evaluacionUno?: boolean;
  isNeutro?: boolean;
  disabled: boolean;
}

export const Evaluacion = ({isTrue,onClick, disabled}:PropsChecks) =>{
  return (
    <button
      className='cursor-pointer'
      onClick={onClick}
      disabled={disabled}
    >
      <FaRegCheckCircle className={`
        ${isTrue ? 'text-[#5CB85C]' : 'text-[#CCC]'}
        text-4xl
      `}  />
    </button>

  )
}

export const EvaluacionIsNot = ({isTrue,onClick, isNeutro}:PropsChecks) =>{
  return (
    <button
      className='cursor-pointer'
      onClick={onClick}
    >
      <IoMdCloseCircleOutline className={`
        ${isTrue || isNeutro ? 'text-[#CCC]' : 'text-[#FF0000]'}
        text-[44px]
      `} />
    </button>

  )
}

// ${evaluacionUno ? 'evaluacion-class' : ''}