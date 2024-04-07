import React, { useEffect, useState } from "react";
import axios from "@configs/axios";

type FileInputProps = {
  onChange?: (fileList: FileList | null) => void;
  handleActionResponse?: (data: any, error?: Error | null) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  accept?: string;
  multiple?: boolean;
  id?: string;
  name: string;
  className?: string;
  action?: string;
  disabled?: boolean;
};

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      onChange,
      onFocus,
      onBlur,
      accept,
      handleActionResponse,
      multiple = false,
      id,
      name,
      className,
      disabled,
      action,
    },
    ref,
  ) => {
    const [progress, setProgress] = useState(0);
    const [abortController, setAbortController] =
      useState<AbortController | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      onChange && onChange(fileList);

      if (action && fileList && fileList.length > 0) {
        const file = fileList[0];
        uploadFile(file, action, setProgress);
      }
    };

    const uploadFile = async (
      file: File,
      action: string,
      setProgress: (progress: number) => void,
    ) => {
      const formData = new FormData();
      formData.append("csvFile", file);

      const controller = new AbortController();
      setAbortController(controller);

      try {
        const response = await axios.post(action, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setProgress(progress);
            }
          },
          signal: controller.signal,
        });

        setProgress(100);
        handleActionResponse && handleActionResponse(response, null);
      } catch (error) {
        setProgress(0);
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Upload canceled");
        } else {
          console.error("Error uploading file:", error);
          handleActionResponse && handleActionResponse(null, error as Error);
        }
      }
    };

    const handleCancel = () => {
      abortController?.abort();
    };

    useEffect(() => {
      return () => {
        abortController?.abort();
      };
    }, [abortController]);

    return (
      <div className="file-input">
        <input
          type="file"
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          accept={accept}
          multiple={multiple}
          id={id}
          name={name}
          className={`file-input__file ${className}`}
          disabled={disabled}
          ref={ref}
        />
        <label htmlFor={id} className="file-input__label">
          <i className="bx bx-upload"></i>{" "}
          {`Select file${multiple ? "(s)" : ""}`}
        </label>

        {/* {action && progress > 0 && (
          <div className="file-input__progress">
            <progress value={progress} max="100" />
            <span>{progress}%</span>
            {progress < 100 && <button onClick={handleCancel}>Cancel</button>}
          </div>
        )} */}
      </div>
    );
  },
);

FileInput.displayName = "FileInput";

export default FileInput;
