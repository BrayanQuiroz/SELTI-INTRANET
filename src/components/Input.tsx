import React from 'react';
import clsx from "clsx";

type Props = {
   label?: string;
   className?: string;
}& React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, Props>  (
   ({label, className, ...props}, ref) => {
   return (
      <div className=" flex mb-4 flex-col w-full items-center ">
         <div className="flex flex-col">
            {label && <label className="text-x font-bold self-start text-redMain">{label}</label>}
            <input
               className={clsx(
                  "bg-gray-50 border border-gray-300 rounded py-[6px]",
                  " p-4 mt-2 text-gray-700 text-base focus:outline-none",
                  "focus:ring-2 focus:ring-gray-400 shadow-sm",
                  className
               )}
               ref={ref}
               {...props}
            />
         </div>
      </div>
   );
});

Input.displayName = "Input";

export default Input;