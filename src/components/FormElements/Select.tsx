import React, {
  useState,
  FC,
  ReactElement,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
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
  disabled = false,
  placeholder,
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the dropdown if the click is outside
      }
    },
    [selectRef],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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

  let _value: any;
  if (value && typeof value === "string") {
    _value = options.find((item) => {
      return item.value.toLowerCase() === value.toLowerCase() ? item : null;
    });
  }
  return (
    <div
      style={styles}
      tabIndex={0}
      ref={selectRef} // Attach the ref
      onKeyDown={debounce(handleKeyDown, 800)}
      id={id ? id : className}
      className={`${className ? className : ""}`}
    >
      <div
        className="selected-option"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-labelledby={ariaLabel ? ariaLabel : name}
      >
        <span className="selected-value">
          {_value?.label || placeholder || "Select an option"}
        </span>
        <span className="selected-chevron">
          <i className={`bx bxs-chevron-${isOpen ? "down" : "up"}`}></i>
        </span>
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option, index) => {
            return (
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
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectInput;
