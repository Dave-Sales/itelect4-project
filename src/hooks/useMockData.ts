import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export interface UseMockDataResult<T> {
  data: T[];
  setData: Dispatch<SetStateAction<T[]>>;
  isLoaded: boolean;
  error: string | null;
}

export function useMockData<T>(initialData: T[]): UseMockDataResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      if (initialData.length === 0) {
        setError("No data available.");
      } else {
        setData(initialData);
      }
      setIsLoaded(true);
    }, 150);

    return () => window.clearTimeout(timerId);
  }, [initialData]);

  return { data, setData, isLoaded, error };
}
