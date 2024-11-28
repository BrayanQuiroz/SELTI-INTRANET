import React from "react";

type Options = {
    value: string | number;
    label: string;
 }

 type SelectProps = {
    options: Options[];
    value: string | number;
    onChange?: (value: string | number) => void;
    className?: string;
    placeholder?: string;
 }

const Selects: React.FC<SelectProps> = ({options, placeholder,value, onChange, className}) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(event.target.value);
    }

    return (
        <select
           value={value}
           onChange={handleChange}
        >
           <option value="">
              {placeholder}
           </option>
           {
              options.map((option, index) => (
                 <option key={index} value={option.value}>
                    {option.label}
                 </option>
              ))
           }
        </select>
    );
};

export default Selects;