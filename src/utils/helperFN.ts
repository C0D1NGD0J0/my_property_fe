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
