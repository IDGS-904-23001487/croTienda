import { useState } from 'react';

export function useCount(initialValue = 0, min = 0, max = 100) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => (prev < max ? prev + 1 : prev));
  const decrement = () => setCount((prev) => (prev > min ? prev - 1 : prev));
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset, setCount };
}