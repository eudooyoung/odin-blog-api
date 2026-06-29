import { usePost } from "@/hooks/usePost.ts";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("usePost hook", () => {
  it("post get request success", async () => {
    const mockPost = {
      id: 1,
      title: "mock-title",
      content: "mock-content",
      createdAt: "2020-01-01T00:00:00.000Z",
      author: "mock-author",
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
});
