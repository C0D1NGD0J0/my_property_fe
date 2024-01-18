import React, { ReactNode, FormEvent, CSSProperties } from "react";

// Define a type for the form variants
type FormVariant = "auth" | "basic" | "custom";

// Define the props type
interface FormProps {
  children: ReactNode;
  id?: string;
  encType?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
  style?: CSSProperties;
}

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  id,
  encType,
  className,
  style,
}) => {
  return (
    <form
      encType={encType}
      className={`${className ?? ""}`}
      style={style}
      onSubmit={onSubmit}
      id={id}
    >
      {children}
    </form>
  );
};

export default Form;
