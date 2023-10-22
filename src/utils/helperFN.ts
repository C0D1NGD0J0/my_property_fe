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
