import { useEffect, useState } from "react";

export const useAsync = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abrtController = new AbortController();

    void (async () => {
      try {
        const response = await fetch(url, {
          method: "get",
          signal: abrtController.signal,
        });

        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();

        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            return;
          }
          setError(error);
        }
      } finally {
        if (!abrtController.signal.aborted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      abrtController.abort();
    };
  }, [url]);

  return { data, error, loading };
};
