import Profile from "@/pages/profile/Profile";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockUseAuthContext } = vi.hoisted(() => ({
  mockUseAuthContext: vi.fn(),
  mockUseProfile: vi.fn(),
}));

vi.mock("@/hooks/useAuthContext", () => ({
  useAuthContext: mockUseAuthContext,
}));

describe("Profile page", () => {
  beforeEach(() => {
    mockUseAuthContext.mockReturnValue({
      user: { username: "mock-username", displayName: "mock-name" },
    });
  });

  it("display user info", () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    expect(screen.getByText(/mock-username/i)).toBeInTheDocument();
    expect(screen.getByText(/mock-name/i)).toBeInTheDocument();
  });
});
