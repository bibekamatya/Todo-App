import React, { ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  type?: "button" | "submit" | "reset"; // standard HTML button types
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  className = "",
  type = "button",
}) => {
  return (
    <button
      disabled={disabled}
      className={
        className
          ? className
          : "ml-2 h-9 flex w-full items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-400"
      }
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
