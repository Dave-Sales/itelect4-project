import { useState, type Dispatch, type SetStateAction } from "react";

export interface UseSelectionResult<T> {
  selectedValue: T | null;
  setSelectedValue: Dispatch<SetStateAction<T | null>>;
  clearSelection: () => void;
}

export function useSelection<T>(): UseSelectionResult<T> {
  const [selectedValue, setSelectedValue] = useState<T | null>(null);

  const clearSelection = (): void => {
    setSelectedValue(null);
  };

  return { selectedValue, setSelectedValue, clearSelection };
}
