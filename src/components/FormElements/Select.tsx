import React, {
  useState,
  FC,
  ReactElement,
  KeyboardEvent,
  useCallback,
  useEffect,
} from "react";
import { debounce } from "@utils/helperFN";

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

const SelectInput: FC<FormSelectProps> = ({
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
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

  const handleOptionClick = (optionValue: any) => {
    onChange(name, optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " ") {
      setIsOpen(!isOpen);
      return;
    }
  };

  return (
    <div
      tabIndex={0}
      style={styles}
      onKeyDown={debounce(handleKeyDown, 800)}
      id={id ? id : className}
      className={`${className ? className : ""}`}
    >
      <div
        className="selected-option"
        onClick={() => setIsOpen(!isOpen)}
        aria-labelledby={ariaLabel ? ariaLabel : name}
      >
        <span className="selected-value">
          {value || placeholder || "Select an option"}
        </span>
        <span className="selected-chevron">
          <i className="bx bxs-chevron-down"></i>
        </span>
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option, index) => (
            <li
              key={index}
              className="option-item"
              aria-selected={index === focusedOptionIndex}
              onClick={() => {
                handleOptionClick(option.value);
              }}
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

export default SelectInput;
