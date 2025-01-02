import React from 'react';
import clsx from 'clsx';

type Props = {
  label?: string;
  className?: string;
  isLabel?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputFile = React.forwardRef<HTMLInputElement, Props>(
  ({ label, isLabel,className, ...props }, ref) => {
    return (
      <div className={
        clsx(className, `${isLabel ? 'w-[206px]':'w-[190px]'}`,
          `flex flex-col ${isLabel ? 'bg-blueFile':'bg-redMain'}`)}>
        <div className="flex flex-col text-white font-semibold text-lg">
          <label htmlFor="subir" className="inline-block   px-4 py-2 cursor-pointer">
            { isLabel ? 'ARCHIVO CARGADO' :'CARGAR ARCHIVO'}
          </label>
          <input
            id="subir"
            type="file"
            className={clsx(
              'hidden',
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  },
);

InputFile.displayName = 'Input';

export default InputFile;
