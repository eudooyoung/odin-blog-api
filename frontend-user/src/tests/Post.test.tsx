import { Post } from "@/pages/Post.tsx";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockUsePost, mockUseAuthContext, mockUseComment } = vi.hoisted(() => ({
  mockUsePost: vi.fn(),
  mockUseAuthContext: vi.fn(),
  mockUseComment: vi.fn(),
}));

vi.mock("@/hooks/usePost", () => ({
  usePost: mockUsePost,
}));

vi.mock("@/hooks/useAuthContext", () => ({
  useAuthContext: mockUseAuthContext,
}));

vi.mock("@/hooks/useComment", () => ({
  useComment: mockUseComment,
}));

describe("Post page", () => {
  beforeEach(() => {
    mockUsePost.mockReturnValue({
      post: {
        id: 1,
        title: "mock-title",
        content: "mock-content",
        createdAt: "2020-01-01T00:00:00.000Z",
        author: "mock-author",
        comments: [
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
        ],
      },
      postLoading: false,
      postError: false,
    });

    mockUseAuthContext.mockReturnValue({
      user: { id: 1, username: "mock-user", displayName: "mock-name" },
    });

    mockUseComment.mockReturnValue({
      comment: vi.fn(),
      commentError: null,
      commentLoading: false,
    });
  });

  it("render post detail", () => {
    render(
      <MemoryRouter>
        <Post />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /mock-title/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/mock-content/i)).toBeInTheDocument();
    expect(screen.getByText(/20. 1. 1./)).toBeInTheDocument();
    expect(screen.getByText(/mock-author/i)).toBeInTheDocument();

    expect(screen.getByText(/mock-comment$/i)).toBeInTheDocument();
    expect(screen.getByText(/mock-comment-author$/i)).toBeInTheDocument();
  });

  describe("Comment component", () => {
    it("add comment", async () => {
      const user = userEvent.setup();
      const comment = vi.fn();
      mockUseComment.mockReturnValue({
        comment,
        commentError: null,
        commentLoading: false,
      });
      render(
        <MemoryRouter>
          <Post />
        </MemoryRouter>,
      );

      const commentInput = screen.getByRole("textbox", { name: /comment/i });
      await user.type(commentInput, "new-comment");
      const saveCommentButton = screen.getByRole("button", {
        name: /comment/i,
      });
      await user.click(saveCommentButton);
      expect(screen.getByRole("textbox", { name: /comment/i })).toHaveValue("");
      expect(comment).toHaveBeenCalledWith({ commentContent: "new-comment" });
    });

    it("add comment only avaliable for auth user", () => {
      mockUseAuthContext.mockReturnValueOnce({});
      render(
        <MemoryRouter>
          <Post />
        </MemoryRouter>,
      );
      expect(
        screen.getByPlaceholderText(/login to leave a comment/i),
      ).toBeDisabled();
      expect(screen.queryByRole("button", { name: /comment/i })).toBeNull();
    });

    it("update comment", async () => {
      const user = userEvent.setup();
      const updateComment = vi.fn();
      mockUseComment.mockReturnValue({
        comment: vi.fn(),
        updateComment,
        commentError: null,
        commentLoading: false,
      });
      render(
        <MemoryRouter>
          <Post />
        </MemoryRouter>,
      );

      const editButton = screen.getByRole("button", { name: /edit/i });
      await user.click(editButton);
      const editingComment = editButton.closest("article") as HTMLElement;
      const updateCommentInput = within(editingComment).getByRole("textbox", {
        name: /edit comment/i,
      });
      await user.clear(updateCommentInput);
      await user.type(updateCommentInput, "edited comment content");
      const commentButton = within(editingComment).getByRole("button", {
        name: /post/i,
      });
      await user.click(commentButton);
      expect(updateComment).toHaveBeenCalledWith({
        newCommentContent: "edited comment content",
      });
    });

    it("cancel edit comment", async () => {
      const user = userEvent.setup();
      const updateComment = vi.fn();
      mockUseComment.mockReturnValue({
        comment: vi.fn(),
        updateComment,
        commentError: null,
        commentLoading: false,
      });
      render(
        <MemoryRouter>
          <Post />
        </MemoryRouter>,
      );

      const editButton = screen.getByRole("button", { name: /edit/i });
      await user.click(editButton);
      const editingComment = editButton.closest("article") as HTMLElement;
      const cancelButton = within(editingComment).getByRole("button", {
        name: /cancel/i,
      });
      await user.click(cancelButton);
      expect(
        within(editingComment).queryByRole("textbox", {
          name: /edit comment/i,
        }),
      ).toBeNull();
    });

    it("delete comment", async () => {
      const user = userEvent.setup();
      const deleteComment = vi.fn();
      mockUseComment.mockReturnValue({
        comment: vi.fn(),
        deleteComment,
        commentError: null,
        commentLoading: false,
      });
      render(
        <MemoryRouter>
          <Post />
        </MemoryRouter>,
      );

      const deleteButton = screen.getByRole("button", { name: /delete/i });
      await user.click(deleteButton);
      expect(deleteComment).toHaveBeenCalled();
    });

    it("edit and delete only visible to author", () => {
      render(
        <MemoryRouter>
          <Post />
        </MemoryRouter>,
      );

      const othersComment = screen
        .getByText(/mock-comment2$/)
        .closest("article") as HTMLElement;
      expect(
        within(othersComment).queryByRole("button", { name: /edit/i }),
      ).toBeNull();
      expect(
        within(othersComment).queryByRole("button", { name: /delete/i }),
      ).toBeNull();
    });
  });
});
