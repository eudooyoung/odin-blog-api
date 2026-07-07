import { Post } from "@/pages/post/Post";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  mockUsePost,
  mockUseAuthContext,
  mockUseComments,
  mockUseCommentAction,
} = vi.hoisted(() => ({
  mockUsePost: vi.fn(),
  mockUseAuthContext: vi.fn(),
  mockUseComments: vi.fn(),
  mockUseCommentAction: vi.fn(),
}));

vi.mock("@/hooks/usePost", () => ({
  usePost: mockUsePost,
}));

vi.mock("@/hooks/useAuthContext", () => ({
  useAuthContext: mockUseAuthContext,
}));

vi.mock("@/hooks/useComments", () => ({
  useComments: mockUseComments,
}));

vi.mock("@/hooks/useCommentAction", () => ({
  useCommentAction: mockUseCommentAction,
}));

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

const mockComments = [
  {
    id: 1,
    content: "mock-comment",
    authorId: 1,
    author: { id: 1, displayName: "mock-comment-author" },
  },
  {
    id: 2,
    content: "mock-comment2",
    authorId: 2,
    author: { id: 2, displayName: "mock-comment-author2" },
  },
];

describe("Post page", () => {
  beforeEach(() => {
    mockUsePost.mockReturnValue({
      post: mockPost,
      postLoading: false,
      postError: false,
    });

    mockUseAuthContext.mockReturnValue({
      user: { id: 1, username: "mock-user", displayName: "mock-name" },
    });

    mockUseComments.mockReturnValue({
      comments: mockComments,
      commentError: null,
      commentLoading: false,
      refetchComments: vi.fn(),
    });

    mockUseCommentAction.mockReturnValue({});
  });

  describe("Post component", () => {
    it("render post details", () => {
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
      expect(screen.getByText(/mock-post-author/i)).toBeInTheDocument();
    });

    it("render loading component while post loading", () => {
      mockUsePost.mockReturnValueOnce({
        postLoading: true,
      });
      render(
        <MemoryRouter>
          <Post />
        </MemoryRouter>,
      );
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it("render error message", () => {
      mockUsePost.mockReturnValueOnce({
        postError: new Error("Something goes wrong"),
      });
      render(
        <MemoryRouter>
          <Post />
        </MemoryRouter>,
      );
      expect(screen.getByRole("alert")).toHaveTextContent(
        /something goes wrong/i,
      );
    });
  });

  describe("Comment components", () => {
    describe("comments", () => {
      it("render comments", () => {
        render(
          <MemoryRouter>
            <Post />
          </MemoryRouter>,
        );
        expect(screen.getByText(/mock-comment$/i)).toBeInTheDocument();
        expect(screen.getByText(/mock-comment-author$/i)).toBeInTheDocument();
      });

      it("render loading component while comments loading", () => {
        mockUseComments.mockReturnValueOnce({
          commentsLoading: true,
        });
        render(
          <MemoryRouter>
            <Post />
          </MemoryRouter>,
        );
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
        expect(screen.queryByText(/mock-comment$/i)).toBeNull();
      });

      it("render error message component when an error exists", () => {
        mockUseComments.mockReturnValueOnce({
          commentsError: new Error(
            "Something went wrong while fetching comments",
          ),
        });
        render(
          <MemoryRouter>
            <Post />
          </MemoryRouter>,
        );
        expect(screen.getByRole("alert")).toHaveTextContent(
          /something went wrong while fetching comments/i,
        );
      });
    });

    describe("comment actions", () => {
      it("add comment", async () => {
        const user = userEvent.setup();
        const createComment = vi.fn().mockReturnValue(true);
        mockUseCommentAction.mockReturnValue({
          createComment,
        });
        const refetchComments = vi.fn();
        mockUseComments.mockReturnValue({
          comments: mockComments,
          commentError: null,
          commentLoading: false,
          refetchComments,
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
        expect(screen.getByRole("textbox", { name: /comment/i })).toHaveValue(
          "",
        );
        expect(createComment).toHaveBeenCalledWith({
          content: "new-comment",
        });
        expect(refetchComments).toHaveBeenCalledOnce();
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
        expect(
          screen.queryByRole("button", { name: /comment/i }),
        ).toBeDisabled();
      });

      it("update comment", async () => {
        const user = userEvent.setup();
        const updateComment = vi.fn().mockResolvedValue(true);
        mockUseCommentAction.mockReturnValue({
          updateComment,
        });
        render(
          <MemoryRouter>
            <Post />
          </MemoryRouter>,
        );

        const editButton = screen.getByRole("button", { name: /edit/i });
        const editingComment = editButton.closest("article") as HTMLElement;
        await user.click(editButton);

        const updateCommentInput = within(editingComment).getByRole("textbox", {
          name: /edit comment/i,
        });
        await user.clear(updateCommentInput);
        await user.type(updateCommentInput, "edited comment content");
        const commentButton = within(editingComment).getByRole("button", {
          name: /save/i,
        });
        await user.click(commentButton);
        await waitFor(() => {
          expect(
            within(editingComment).queryByRole("textbox", {
              name: /edit comment/i,
            }),
          ).toBeNull();
        });
        expect(updateComment).toHaveBeenCalledWith(expect.any(Number), {
          content: "edited comment content",
        });
      });

      it("cancel edit comment", async () => {
        const user = userEvent.setup();
        mockUseComments.mockReturnValue({
          comments: mockComments,
          commentError: null,
          commentLoading: false,
        });
        mockUseCommentAction.mockReturnValue({
          updateComment: vi.fn(),
        });
        render(
          <MemoryRouter>
            <Post />
          </MemoryRouter>,
        );

        const editButton = screen.getByRole("button", { name: /edit/i });
        const editingComment = editButton.closest("article") as HTMLElement;
        await user.click(editButton);
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
        mockUseCommentAction.mockReturnValue({
          deleteComment,
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

      it("display validation error", () => {
        mockUseCommentAction.mockReturnValue({
          commentValidationError: {
            content: "some validation error with comment content",
          },
        });
        render(
          <MemoryRouter>
            <Post />
          </MemoryRouter>,
        );

        expect(
          screen.getByText(/some validation error with comment content/i),
        ).toBeInTheDocument();
      });

      it("display other error", async () => {
        mockUseCommentAction.mockReturnValue({
          commentError: new Error("Something went wrong with comment action"),
        });
        render(
          <MemoryRouter>
            <Post />
          </MemoryRouter>,
        );

        const commentErrors = screen.getAllByText(
          /something went wrong with comment action/i,
        );
        commentErrors.forEach((error) => {
          expect(error).toBeInTheDocument();
        });
      });

      it("disable submit button when pending response", () => {
        mockUseCommentAction.mockReturnValueOnce({
          commentLoading: true,
        });
        render(
          <MemoryRouter>
            <Post />
          </MemoryRouter>,
        );
        expect(screen.getByRole("button", { name: /comment/i })).toBeDisabled();
      });
    });
  });
});
