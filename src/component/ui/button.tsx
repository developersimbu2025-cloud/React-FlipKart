import React from "react";

type ButtonProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  
};

// ✅ Wrap with React.memo
const Button = React.memo(
  ({
    onClick,
    type,
    className = "",
    disabled = false,
    children,
  }: ButtonProps) => {
    return (
      <div>
        <button
          type={type}
          onClick={onClick}
          className={`px-4 py-2 cursor-pointer rounded   disabled:opacity-50 ${className}`}
          disabled={disabled}
        >
          {children}
        </button>
      </div>
    );
  }
);

export default Button;
