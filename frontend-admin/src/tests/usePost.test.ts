import { usePost } from "@/hooks/usePost.ts";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("usePost hook", () => {
  it("getPost request success", async () => {
    const mockPost = {
      id: 1,
      title: "mock-title",
      content: "mock-content",
      createdAt: "2020-01-01T00:00:00.000Z",
      authorId: 1,
      author: {
        id: 1,
        displayName: "mock-post-author",
      },
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPost),
    } as Response);
    const { result } = renderHook(() => usePost(1));

    expect(result.current.postLoading).toBe(true);
    expect(result.current.postError).toBeNull();
    await waitFor(() => {
      expect(result.current.postLoading).toBe(false);
    });
    expect(result.current.post).toEqual(mockPost);
    expect(result.current.postError).toBeNull();
  });

  it("getPost request fails with HTTP error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: { message: "HTTP error" } }),
    } as Response);
    const { result } = renderHook(() => usePost(1));

    await waitFor(() => {
      expect(result.current.postLoading).toBe(false);
    });
    expect(result.current.postError?.message).toMatch(/http error/i);
  });

  it("getPost request fails with fetch error", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new Error("Fetch fails"),
    );
    const { result } = renderHook(() => usePost(1));

    await waitFor(() => {
      expect(result.current.postLoading).toBe(false);
    });
    expect(result.current.postError?.message).toMatch(/fetch fails/i);
  });

  it("abort request on unmount", () => {
    const abort = vi.fn();
    vi.stubGlobal(
      "AbortController",
      class mockAbort {
        signal = {};
        abort = abort;
      },
    );
    const { unmount } = renderHook(() => usePost(1));

    unmount();
    expect(abort).toHaveBeenCalled();
  });
});
