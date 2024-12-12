import React from 'react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Buttons: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button className={clsx('font-bold px-4', className)} {...props}>
      {children}
    </button>
  );
};

export default Buttons;
