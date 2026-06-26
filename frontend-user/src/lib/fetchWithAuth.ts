import type { FetchWithAuthOption } from "@/types/types.ts";

export const fetchWithAuth = async (
  url: string,
  { method, signal, headers }: FetchWithAuthOption,
) => {
  const response = await fetch(url, {
    method,
    signal,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  return response.json();
};
