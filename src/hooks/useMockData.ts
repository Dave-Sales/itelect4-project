import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export interface UseMockDataResult<T> {
  data: T[];
  setData: Dispatch<SetStateAction<T[]>>;
  isLoaded: boolean;
}

export function useMockData<T>(initialData: T[]): UseMockDataResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setData(initialData);
      setIsLoaded(true);
    }, 150);

    return () => window.clearTimeout(timerId);
  }, [initialData]);

  return { data, setData, isLoaded };
}
