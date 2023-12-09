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
    } else if (value && typeof value === "object") {
      objectToFormData(value, form, formKey);
    } else {
      form.append(formKey, String(value));
    }
  });
  return form;
};
