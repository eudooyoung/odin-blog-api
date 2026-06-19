import { useFetch } from "@/hooks/useFetch.ts";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("useFetch hook", () => {
  it("success", async () => {
    const mockData = { test: "test" };
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response);
    });
    const { result } = renderHook(() => useFetch<typeof mockData>("/api"));

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("server error", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 500,
      } as Response);
    });
    const { result } = renderHook(() => useFetch("/api"));

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error?.message).toMatch(/500/i);
  });

  it("fetch error", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.reject(new Error("fetch Error"));
    });
    const { result } = renderHook(() => useFetch("api"));

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error?.message).toMatch(/fetch error/i);
  });
});
