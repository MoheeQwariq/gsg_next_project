"use client";

import type React from "react";

interface IFormInputProps {
  id: string;
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  label: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRightIcon?: () => void;
  className?: string;
}
    
const FormInput = ({
  id,
  name,
  type,
  value,
  placeholder,
  label,
  icon,
  rightIcon,
  onChange,
  onRightIcon: onRightIconClick,
  className = "",
}: IFormInputProps) => {
  return (
    <div className="space-y-2 text-right">
      <label htmlFor={id} className="block text-gray-700 font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border border-gray-200 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            icon ? "pl-12" : ""
          } ${rightIcon ? "pr-10" : ""} ${className}`}
          onChange={onChange}
        />
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        {rightIcon && (
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={onRightIconClick}
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
