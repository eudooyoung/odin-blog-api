import { usePosts } from "@/hooks/usePosts";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("usePosts hook", () => {
  it("fetch posts successfully", async () => {
    const mockData = { test: "test" };
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response);
    });
    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.postsLoading).toBe(false);
    });

    expect(result.current.posts).toEqual(mockData);
  });

  it("fetch posts fails with HTTP error", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: { message: "HTTP error" } }),
      } as Response);
    });
    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.postsLoading).toBe(false);
    });
    expect(result.current.postsError?.message).toMatch(/http error/i);
  });

  it("fetch posts fails with fetch error", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.reject(new Error("fetch Error"));
    });
    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.postsLoading).toBe(false);
    });

    expect(result.current.postsError?.message).toMatch(/fetch error/i);
  });

  it("abort request on unmount", () => {
    const abort = vi.fn();
    vi.stubGlobal(
      "AbortController",
      class MockAbort {
        signal = {};
        abort = abort;
      },
    );
    const { unmount } = renderHook(() => usePosts());
    unmount();

    expect(abort).toHaveBeenCalled();
  });
});
