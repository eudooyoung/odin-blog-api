import Dashboard from "@/pages/Dashboard.tsx";
import Home from "@/pages/Home.tsx";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useAuthContext.ts", () => ({
  useAuthContext: () => ({
    setUser: vi.fn(),
    setToken: vi.fn(),
  }),
}));
vi.mock("@/pages/Home.tsx", () => ({
  default: () => <h2>Home</h2>,
}));

describe("Dashboard Page", () => {
  it("logout", async () => {
    localStorage.setItem("token", "test-token");
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>,
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    await user.click(logoutButton);

    const homeTitle = await screen.findByRole("heading", { name: /home/i });
    expect(homeTitle).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
