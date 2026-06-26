import { AuthContext } from "@/context/AuthContext.ts";
import Home from "@/pages/Home.tsx";
import Login from "@/pages/Login.tsx";
import type { AuthContextValue } from "@/types/types.ts";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it, vi } from "vitest";

const { mockUseLogin } = vi.hoisted(() => ({ mockUseLogin: vi.fn() }));

vi.mock("@/hooks/mockUseLogin.ts", () => ({
  useLogin: mockUseLogin,
}));

describe("Login page", () => {
  it.only("login success", async () => {
    const user = userEvent.setup();
    const mockResponse = {
      user: { username: "mock@mock.com" },
      token: "token",
    };
    mockUseLogin.mockImplementation(() => ({
      login: vi.fn().mockResolvedValue(mockResponse),
      loginLoading: false,
      loginError: null,
    }));
    const mockAuthContext = {
      setUser: vi.fn() as AuthContextValue["setUser"],
      setToken: vi.fn() as AuthContextValue["setToken"],
    } as AuthContextValue;
    const mockLoginForm = {
      username: "mock@mock.com",
      password: "mock-password",
    };
    render(
      <AuthContext value={mockAuthContext}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext>,
    );

    const loginForm = screen.getByRole("form", {
      name: /login/i,
    }) as HTMLFormElement;
    for (const [name, value] of Object.entries(mockLoginForm)) {
      const input = loginForm.elements.namedItem(name) as Element;
      await user.type(input, value);
    }
    await user.click(screen.getByRole("button", { name: /login/i }));
    // expect(mockAuthContext.setUser).toHaveBeenCalledWith(mockResponse.user);
    // expect(mockAuthContext.setToken).toHaveBeenCalledWith(mockResponse.token);
    // expect(localStorage.getItem("token")).toEqual(mockResponse.token);
  });

  it("login pending", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockImplementation(
      () => new Promise(() => {}),
    );
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    await user.type(usernameInput, "test@test.com");
    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, "testpassword");
    const loginButton = screen.getByRole("button", { name: /login/i });
    await user.click(loginButton);

    expect(loginButton).toBeDisabled();
  });

  it("login success", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            user: {},
            token: "token",
          }),
      } as Response);
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>,
    );

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    await user.type(usernameInput, "test@test.com");
    const passwordInput = screen.getByLabelText(/password/);
    await user.type(passwordInput, "testpassword");
    const loginButton = screen.getByRole("button", { name: /login/i });
    await user.click(loginButton);

    const homeTitle = await screen.findByRole("heading", { name: /home/i });
    expect(homeTitle).toBeInTheDocument();
  });

  it("login fails", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 401,
        text: () => Promise.resolve("Invalid username or password"),
      } as Response);
    });
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    await user.type(usernameInput, "test@test.com");
    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, "testpassword");
    const loginButton = screen.getByRole("button", { name: /login/i });
    await user.click(loginButton);

    const errorMessage = await screen.findByText(
      /Invalid username or password/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
