import Header from "@/components/Header.tsx";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useAuthContext.ts", () => ({
  useAuthContext: mockUseAuthContext,
}));

const { mockUseAuthContext } = vi.hoisted(() => ({
  mockUseAuthContext: vi.fn(),
}));

describe("Header Component", () => {
  it("logout", async () => {
    localStorage.setItem("token", "test-token");
    const user = userEvent.setup();
    mockUseAuthContext.mockImplementation(() => {
      return { setUser: vi.fn(), setToken: vi.fn(), token: "test-token" };
    });
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    await user.click(logoutButton);

    expect(localStorage.getItem("token")).toBeNull();
  });
});
