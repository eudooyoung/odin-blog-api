import { useCommentAction } from "@/hooks/useCommentAction.ts";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as lib from "@/lib/fetchWithAuth.ts";
import type { CommentBody } from "@/types/comment.types.ts";

const { mockUseAuthContext } = vi.hoisted(() => ({
  mockUseAuthContext: vi.fn(),
}));

vi.mock("@/hooks/useAuthContext", () => ({
  useAuthContext: mockUseAuthContext,
}));

describe("useCommentAction hook", () => {
  beforeEach(() => {
    mockUseAuthContext.mockReturnValue({
      token: "token",
    });
  });

  describe("create comment action", () => {
    it("create comment success", async () => {
      const mockNewComment = { commentContent: "new comment" };
      const spyFetch = vi.spyOn(lib, "fetchWithAuth").mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve({}),
      } as Response);
      const { result } = renderHook(() => useCommentAction(1));

      expect(result.current.commentLoading).toBe(false);
      expect(result.current.commentValidationError).toEqual({});
      expect(result.current.commentError).toBeNull();
      await act(() => result.current.createComment(mockNewComment));
      await waitFor(() => {
        expect(result.current.commentLoading).toBe(false);
      });
      expect(spyFetch).toHaveBeenCalledWith(
        expect.stringContaining("/posts/1/comments"),
        expect.objectContaining({
          method: "post",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            Authorization: "token",
          }),
          body: JSON.stringify(mockNewComment),
        }),
      );
      expect(result.current.commentValidationError).toEqual({});
      expect(result.current.commentError).toBeNull();
    });

    it("create comment fails with validation error", async () => {
      vi.spyOn(lib, "fetchWithAuth").mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () =>
          Promise.resolve({
            errors: [{ path: "content", msg: "content too long" }],
          }),
      } as Response);
      const { result } = renderHook(() => useCommentAction(1));

      await act(() => result.current.createComment({} as CommentBody));
      await waitFor(() => {
        expect(result.current.commentLoading).toBe(false);
      });
      expect(result.current.commentValidationError).toEqual({
        content: "content too long",
      });
    });

    it("create comment fails with other server side error", async () => {
      vi.spyOn(lib, "fetchWithAuth").mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () =>
          Promise.resolve({
            error: { message: "Server Error" },
          }),
      } as Response);
      const { result } = renderHook(() => useCommentAction(1));

      await act(() => result.current.createComment({} as CommentBody));
      await waitFor(() => {
        expect(result.current.commentLoading).toBe(false);
      });
      expect(result.current.commentError?.message).toMatch(/server error/i);
    });

    it("create comment fails with fetch error", async () => {
      vi.spyOn(lib, "fetchWithAuth").mockRejectedValue(
        new Error("Fetch failed"),
      );
      const { result } = renderHook(() => useCommentAction(1));

      await act(() => result.current.createComment({} as CommentBody));
      await waitFor(() => {
        expect(result.current.commentLoading).toBe(false);
      });
      expect(result.current.commentError?.message).toMatch(/fetch failed/i);
    });
  });

  it("update comment success", async () => {
    const mockUpdatedComment = { commentContent: "updated comment" };
    const spyFetch = vi.spyOn(lib, "fetchWithAuth").mockResolvedValueOnce({
      ok: true,
      status: 204,
      json: () => Promise.resolve({}),
    } as Response);
    const { result } = renderHook(() => useCommentAction(1));

    expect(result.current.commentLoading).toBe(false);
    expect(result.current.commentValidationError).toEqual({});
    expect(result.current.commentError).toBeNull();
    await act(() => result.current.updateComment(1, mockUpdatedComment));
    await waitFor(() => {
      expect(result.current.commentLoading).toBe(false);
    });
    expect(spyFetch).toHaveBeenCalledWith(
      expect.stringContaining("/posts/1/comments/1"),
      expect.objectContaining({
        method: "put",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "token",
        }),
        body: JSON.stringify(mockUpdatedComment),
      }),
    );
    expect(result.current.commentValidationError).toEqual({});
    expect(result.current.commentError).toBeNull();
  });

  it("delete comment success", async () => {
    const spyFetch = vi.spyOn(lib, "fetchWithAuth").mockResolvedValueOnce({
      ok: true,
      status: 204,
      json: () => Promise.resolve({}),
    } as Response);
    const { result } = renderHook(() => useCommentAction(1));

    expect(result.current.commentLoading).toBe(false);
    expect(result.current.commentValidationError).toEqual({});
    expect(result.current.commentError).toBeNull();
    await act(() => result.current.deleteComment(1));
    await waitFor(() => {
      expect(result.current.commentLoading).toBe(false);
    });
    expect(spyFetch).toHaveBeenCalledWith(
      expect.stringContaining("/posts/1/comments/1"),
      expect.objectContaining({
        method: "delete",
        headers: expect.objectContaining({
          Authorization: "token",
        }),
      }),
    );
    expect(result.current.commentValidationError).toEqual({});
    expect(result.current.commentError).toBeNull();
  });
});
