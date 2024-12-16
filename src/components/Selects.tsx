import React from 'react';
import clsx from 'clsx';

type Options = {
  value: string | number;
  label: string;
};

type SelectProps = {
  options: Options[];
  value?: string | number;
  onChange: (value: string | number) => void;
  classNameDiv?: string;
  classNameSelect?: string;
  placeholder?: string;
  labelP: string;
};

const Selects: React.FC<SelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
  classNameDiv,
  classNameSelect,
  labelP,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!e || !e.target) {
      console.error('El evento o su target no están definidos.');
      return;
    }
    const selectedValue = e.target.value;
    const numericValue = Number(selectedValue);
    onChange?.(
      !isNaN(numericValue) && selectedValue.trim() !== ''
        ? numericValue
        : selectedValue,
    );
  };

  return (
    <div className={clsx('flex flex-col', classNameDiv)}>
      <label htmlFor="" className="mb-[8px] font-bold">
        {labelP}
      </label>
      <select
        value={value}
        onChange={handleChange}
        className={clsx('py-[4px] pl-[8px] text-gray-800', classNameSelect)}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selects;
