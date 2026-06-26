import Header from "@/components/Header.tsx";
import { AuthContext } from "@/context/AuthContext.ts";
import type { AuthContextValue } from "@/types/types.ts";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

describe("Header component", () => {
  it("show public links when non-authenticated", () => {
    render(
      <AuthContext value={{} as AuthContextValue}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext>,
    );
    const publicLinks = screen.getAllByRole("link", {
      name: /signup|login/i,
    });
    publicLinks.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
  });

  it("show display name, auth links and logout button when authenticated", () => {
    render(
      <AuthContext
        value={{ user: { displayName: "mock-name" } } as AuthContextValue}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext>,
    );

    const displayName = screen.getByText(/mock-name/i);
    expect(displayName).toBeInTheDocument();
    const authLinks = screen.getAllByRole("link", { name: /profile/i });
    authLinks.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });

  it("logout clears token saved in localStorage", async () => {
    localStorage.setItem("token", "test-token");
    const user = userEvent.setup();
    render(
      <AuthContext
        value={
          {
            setUser: (() => {}) as AuthContextValue["setUser"],
            setToken: (() => {}) as AuthContextValue["setToken"],
            user: { username: "mock-username" },
          } as AuthContextValue
        }>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext>,
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    await user.click(logoutButton);

    expect(localStorage.getItem("token")).toBeNull();
  });
});
