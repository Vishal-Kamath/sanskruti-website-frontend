import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {}
const Button: FC<Props> = ({ className, children, ...props }) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center rounded-md border-2 border-gray-500 py-2 hover:outline hover:outline-4 hover:outline-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
