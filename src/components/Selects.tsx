 type Options = {
    value: string | number;
    label: string;
 }

 type SelectProps = {
    options: Options[];
    value: string | number;
    onChange?: (value: string | number) => void;
    className?: string;
 }

const Selects: React.FC<SelectProps> = ({options, value, onChange, className}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    }

    return (
        <div>
            
        </div>
    );
};

export default Selects;