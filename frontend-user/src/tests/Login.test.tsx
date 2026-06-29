import Home from "@/pages/Home.tsx";
import Login from "@/pages/Login.tsx";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it, vi } from "vitest";
import * as router from "react-router";

const { mockUseLogin } = vi.hoisted(() => ({ mockUseLogin: vi.fn() }));

vi.mock("@/hooks/useLogin.ts", () => ({
  useLogin: mockUseLogin,
}));

describe("Login page", () => {
  it("login success", async () => {
    const user = userEvent.setup();
    const mockLoginForm = {
      username: "mock@mock.com",
      password: "mock-password",
    };
    const login = vi.fn().mockResolvedValue({});
    mockUseLogin.mockImplementation(() => ({
      login,
      loginLoading: false,
      loginError: null,
    }));
    const navigation = vi.fn();
    vi.spyOn(router, "useNavigate").mockImplementation(() => navigation);
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const loginForm = screen.getByRole("form", {
      name: /login/i,
    }) as HTMLFormElement;
    for (const [name, value] of Object.entries(mockLoginForm)) {
      const input = loginForm.elements.namedItem(name) as Element;
      await user.type(input, value);
    }
    await user.click(screen.getByRole("button", { name: /login/i }));
    expect(login).toHaveBeenCalledWith(mockLoginForm);
    expect(navigation).toHaveBeenCalledWith("/");
  });

  it("login button disabled while pending request", async () => {
    mockUseLogin.mockImplementation(() => ({
      login: vi.fn(),
      loginLoading: true,
      loginError: null,
    }));
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeDisabled();
  });

  it("signup fails", async () => {
    mockUseLogin.mockImplementation(() => ({
      login: vi.fn(),
      loginLoading: false,
      loginError: new Error("Invalid username or password"),
    }));
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const errorMessage = await screen.findByText(
      /Invalid username or password/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
