import React, { useState, FC, ReactElement } from "react";
import "@components/ui/FormElements/style.scss";

interface Option {
  label: string;
  value: string | number | any;
  icon?: ReactElement | "" | null | string; // Optional icon
}

interface FormSelectProps {
  id?: string;
  name: string;
  options: Option[];
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  value: string | number;
  styles?: React.CSSProperties;
  onChange: (name: string, value: any) => void;
}

const SelectField: FC<FormSelectProps> = ({
  id = "",
  name,
  value,
  styles,
  onChange,
  className,
  options,
  placeholder,
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: any) => {
    onChange(name, optionValue);
    setIsOpen(false);
  };

  return (
    <div
      style={styles}
      className={`custom-dropdown ${className ? className : ""}`}
      id={id ? id : name}
    >
      <div
        className="selected-option"
        onClick={() => setIsOpen(!isOpen)}
        aria-labelledby={ariaLabel ? ariaLabel : name}
      >
        <span>{value || placeholder || "Select an option"}</span>
        <span className="selected-chevron">X</span>
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option, index) => (
            <li
              key={index}
              className="option-item"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.icon && (
                <span className="option-icon">{option.icon}</span>
              )}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectField;
