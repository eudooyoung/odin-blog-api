import { AuthContext } from "@/context/AuthContext.ts";
import Login from "@/pages/Login.tsx";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import type { AuthContextValue } from "@/types/types.ts";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";

describe("Protected Route", () => {
  it("show protected pages when auth user access", () => {
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <AuthContext value={{ token: "token" } as AuthContextValue}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<h2>Protected Page</h2>} />
            </Route>
          </Routes>
        </AuthContext>
      </MemoryRouter>,
    );

    const protectedHeading = screen.getByRole("heading", {
      name: /protected/i,
    });
    expect(protectedHeading).toBeInTheDocument();
  });

  it("navigate to login page when non-auth user access to protected pages", () => {
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <AuthContext value={{ token: null } as AuthContextValue}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<h2>Protected Page</h2>} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthContext>
      </MemoryRouter>,
    );

    const loginHeading = screen.getByRole("heading", { name: /login/i });
    expect(loginHeading).toBeInTheDocument();
  });
});
