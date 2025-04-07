"use client";
import type React from "react";
import formInputStyles from "@/styles/auth/formInputStyles";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();
  const styles = formInputStyles[theme];
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          className={`${styles.input} ${icon ? styles.inputPaddingLeft : ""} ${
            rightIcon ? styles.inputPaddingRight : ""
          } ${className}`}
          onChange={onChange}
        />
        {icon && <div className={styles.icon}>{icon}</div>}
        {rightIcon && (
          <button type="button" className={styles.rightIcon} onClick={onRightIconClick}>
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
