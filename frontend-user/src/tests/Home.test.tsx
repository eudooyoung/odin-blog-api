import Home from "@/pages/home/Home.tsx";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it, vi } from "vitest";

const { mockUsePosts } = vi.hoisted(() => ({ mockUsePosts: vi.fn() }));

vi.mock("@/hooks/usePosts.ts", () => ({
  usePosts: mockUsePosts,
}));

describe("Home page", () => {
  it("render posts on home", async () => {
    mockUsePosts.mockReturnValue({
      posts: [
        {
          id: 1,
          title: "mock-title",
          content: "mock-content",
          createdAt: Date.now(),
        },
      ],
    });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    const title = screen.getByRole("heading", { name: /mock-title/i });
    expect(title).toBeInTheDocument();
    const content = screen.getByText(/mock-content/i);
    expect(content).toBeInTheDocument();
  });

  it("navigate to a post on cliking its title", async () => {
    const user = userEvent.setup();
    const mockPosts = [
      {
        id: 1,
        title: "mock-title",
        content: "mock-content",
        createdAt: Date.now(),
      },
    ];
    mockUsePosts.mockReturnValue({
      posts: mockPosts,
    });
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:postId" element={<h2>Post Detail</h2>} />
        </Routes>
      </MemoryRouter>,
    );
    const title = screen.getByRole("link", { name: /mock-title/i });
    await user.click(title);
    const content = screen.getByText(/post detail/i);
    expect(content).toBeInTheDocument();
  });
});
