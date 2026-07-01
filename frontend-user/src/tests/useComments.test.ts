import { useComments } from "@/hooks/useComments";
import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("useComments hook", () => {
  it("fetch comments success", async () => {
    const mockComments = [
      {
        id: 1,
        content: "mock-comment",
        authorId: 1,
        author: "mock-comment-author",
      },
      {
        id: 2,
        content: "mock-comment2",
        authorId: 2,
        author: "mock-comment-author2",
      },
    ];
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockComments),
    } as Response);
    const { result } = renderHook(() => useComments(1));

    expect(result.current.commentsLoading).toBe(true);
    expect(result.current.commentsError).toBeNull();
    await waitFor(() => {
      expect(result.current.commentsLoading).toBe(false);
    });
    expect(result.current.comments).toEqual(mockComments);
    expect(result.current.commentsError).toBeNull();
  });

  it("fetch comments fails with HTTP error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: { message: "HTTP error" } }),
    } as Response);
    const { result } = renderHook(() => useComments(1));

    await waitFor(() => {
      expect(result.current.commentsLoading).toBe(false);
    });
    expect(result.current.commentsError?.message).toMatch(/http error/i);
  });

  it("fetch comments fails with fetch error", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new Error("Fetch fails"),
    );
    const { result } = renderHook(() => useComments(1));

    await waitFor(() => {
      expect(result.current.commentsLoading).toBe(false);
    });
    expect(result.current.commentsError?.message).toMatch(/fetch fails/i);
  });

  it("refetch comments", async () => {
    const initialComments = [
      {
        id: 1,
        content: "mock-comment",
        authorId: 1,
        author: "mock-comment-author",
      },
    ];
    const updatedComments = [
      ...initialComments,
      {
        id: 2,
        content: "mock-comment2",
        authorId: 2,
        author: "mock-comment-author2",
      },
    ];
    const spyFetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(initialComments),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(updatedComments),
      } as Response);
    const { result } = renderHook(() => useComments(1));

    await act(() => result.current.refetchComments());
    await waitFor(() => {
      expect(result.current.commentsLoading).toBe(false);
    });
    expect(spyFetch).toHaveBeenCalledTimes(2);
    expect(result.current.comments).toEqual(updatedComments);
    expect(result.current.commentsError).toBeNull();
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
    const { unmount } = renderHook(() => useComments(1));

    unmount();
    expect(abort).toHaveBeenCalledOnce();
  });
});
