import React from "react";

type FileInputProps = {
  onChange: (fileList: FileList | null) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  accept?: string;
  multiple?: boolean;
  id?: string;
  name: string;
  className?: string;
  disabled?: boolean;
};

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      onChange,
      onFocus,
      onBlur,
      accept,
      multiple,
      id,
      name,
      className,
      disabled,
    },
    ref,
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      onChange(fileList);
    };

    return (
      <>
        <input
          type="file"
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          accept={accept}
          multiple={multiple}
          id={id}
          name={name}
          className={className}
          disabled={disabled}
          ref={ref}
        />
        <label htmlFor={id} className="file-input">
          <i className="bx bx-upload"></i> Click to upload
        </label>
      </>
    );
  },
);

FileInput.displayName = "FileInput";

export default FileInput;
