import { useCommentAction } from "@/hooks/useCommentAction.ts";
import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as lib from "@/lib/fetchWithAuth.ts";
import { useAuthContext } from "@/hooks/useAuthContext.ts";

const { mockUseAuthContext } = vi.hoisted(() => ({
  mockUseAuthContext: vi.fn(),
}));

vi.mock("@/hooks/useAuthContext", () => ({
  useAuthContext: mockUseAuthContext,
}));

describe("useCommentAction hook", () => {
  it("create comment success", async () => {
    const mockNewComment = { commentContent: "new comment" };
    const spyFetch = vi.spyOn(lib, "fetchWithAuth").mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: () => Promise.resolve(),
    } as Response);
    mockUseAuthContext.mockReturnValueOnce({
      token: "token",
    });
    const { result } = renderHook(() => useCommentAction());

    expect(result.current.commentLoading).toBe(false);
    expect(result.current.commentValidationError).toEqual({});
    expect(result.current.commentError).toBeNull();
    await act(() => {
      result.current.createComment(mockNewComment);
    });
    await waitFor(() => {
      expect(result.current.commentLoading).toBe(false);
    });
    expect(spyFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ body: { newComment: mockNewComment } }),
    );
    expect(result.current.commentValidationError).toEqual({});
    expect(result.current.commentError).toBeNull();
  });
});
