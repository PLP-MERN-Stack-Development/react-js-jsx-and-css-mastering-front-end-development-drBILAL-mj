// src/hooks/useDebounce.js
import { useState, useEffect } from "react";

/**
 * useDebounce(value, delay)
 * - returns a debounced version of `value` which updates only after `delay` ms of inactivity
 * - used to avoid firing API/search logic on every keystroke
 */
export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // cleanup on value/delay change
  }, [value, delay]);

  return debounced;
}
