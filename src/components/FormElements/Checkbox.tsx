import React, { CSSProperties, ChangeEvent } from "react";

interface CheckboxWithLabelProps {
  name: string;
  label: string;
  checked?: boolean;
  style?: CSSProperties;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  name,
  label,
  checked,
  onChange,
  style,
}) => {
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        name={name}
        style={style}
        checked={checked}
        onChange={onChange}
        className="form-input_checkbox"
      />
      <div className="checkbox-label-wrapper">
        <label className="form-label">{label}</label>
      </div>
    </div>
  );
  3;
};

export default CheckboxWithLabel;
