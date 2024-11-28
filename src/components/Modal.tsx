import React, {ReactNode} from 'react';
import clsx from "clsx";

interface ModalProps {
   isOpen: boolean;
   onClose: ()=> void;
   children: ReactNode;
   textModal: string;
   ClassName?: string;
}

const Modal: React.FC<ModalProps> = ({textModal, ClassName, isOpen,onClose , children}) => {
   if(!isOpen) return null;

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
           onClick={onClose}>
         <div className={clsx("bg-white pb-[1.5rem] rounded shadow-lg relative w-[505px] mb-[12rem]", ClassName)}
              onClick={(e) => e.stopPropagation()}>
            <div className="bg-redMain w-full mb-4">
               <div className="p-4 flex">
                  <p className="text-white text-xl font-bold">{textModal}</p>
               </div>
               <button
                  className="absolute text-xl top-4 right-4 text-white hover:text-gray-600 focus:outline-none"
                  onClick={onClose}
               >
                  ✖
               </button>
            </div>
            {children}
         </div>
      </div>
   );
};

export default Modal;