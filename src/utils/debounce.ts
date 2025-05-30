type DebouncedFunction<Args extends unknown[]> = (...args: Args) => void;

export const debounce = <Args extends unknown[]>(
  func: (...args: Args) => void,
  wait: number
): DebouncedFunction<Args> => {
  let timeoutId: number | undefined;

  return (...args: Args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      func(...args);
    }, wait);
  };
};
