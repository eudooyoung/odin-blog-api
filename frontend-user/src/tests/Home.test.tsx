import Home from "@/pages/Home.tsx";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/usePosts", () => ({
  usePosts: () => ({
    posts: [
      {
        id: 1,
        title: "mock-title",
        content: "mock-content",
        createdAt: Date.now(),
      },
    ],
  }),
}));

describe("Home page", () => {
  it("render posts on home page", async () => {
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
});
