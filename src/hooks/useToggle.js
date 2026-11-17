import { useCallback, useState } from "react";

// Custom hook: a true/false value and a function that flips it.
// Returns [value, toggle], so `const [open, toggleOpen] = useToggle();`.
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((current) => !current), []);
  return [value, toggle];
}
