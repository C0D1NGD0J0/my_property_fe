export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]+)+$/,
);

type Procedure = (...args: any[]) => void;
export const debounce = <F extends Procedure>(
  func: F,
  delay: number,
): ((...args: Parameters<F>) => void) => {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const uuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[0-9a-fA-F]?$/i;
export const hex64Regex = /^[0-9a-fA-F]{64}$/i;

export const objectToFormData = (
  obj: Record<string, any>,
  form: FormData = new FormData(),
  namespace: string = "",
): FormData => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const formKey = namespace ? `${namespace}[${key}]` : key;

    if (value instanceof Date) {
      form.append(formKey, value.toISOString());
    } else if (formKey === "photos" && value.length) {
      for (let i = 0; i < value.length; i++) {
        form.append("photos", value[i]);
      }
    } else if (value && typeof value === "object" && key !== "photo") {
      objectToFormData(value, form, formKey);
    } else {
      form.append(formKey, value);
    }
  });
  return form;
};

// Throttle function definition
export const throttle = <T extends any[]>(
  func: (...args: T) => void,
  limit: number,
) => {
  let inThrottle: boolean;
  return function (this: ThisParameterType<typeof func>, ...args: T) {
    if (!inThrottle) {
      func.apply(this, args); // Apply the function
      inThrottle = true; // Set throttle flag
      setTimeout(() => (inThrottle = false), limit); // Reset throttle flag after limit
    }
  };
};

export const formatErrors = (
  errorObject:
    | {
        isValid: boolean;
        errors?: {
          [key: string]: any;
        };
      }
    | undefined,
) => {
  // Initialize an array to hold formatted error messages
  let errorMessages = [];
  if (errorObject && errorObject.errors) {
    // Iterate over the keys of the errors object
    for (const key in errorObject.errors) {
      if (errorObject.errors.hasOwnProperty(key)) {
        // Construct the error message and add it to the array
        errorMessages.push(`${key}: ${errorObject.errors[key]}`);
      }
    }
  }

  // Join the array of error messages into a single string with each message on a new line
  return errorMessages.join("\n");
};
