import { useEffect, useState } from "react";

const useFetch = <T>(url: string, options?: {[key: string]: [value: unknown] }): {
    data: T | undefined;
    isLoading: boolean;
    error: string;
} => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<T>();

    useEffect(() => {
        async function getData() {
          let response: Response;
          try {
            setIsLoading(true);
            
            if (options) {
                response = await fetch(url, options);
            } else {
                response = await fetch(url);
            }
            if (response.status !== 200) {
              setError(`Error: ${response.status}`);
            }
            //const response = await fetch(url); //`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            const data = await response.json();
            //setData((prev) => [...prev, ...data.results]);
            setData(data);
          } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
          } finally {
            setIsLoading(false);
            
          }
        }
        getData();
    
      }, [options, url]);

    return { data, isLoading, error }
};

export { useFetch };
