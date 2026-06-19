import Home from "@/pages/Home.tsx";
import Login from "@/pages/Login.tsx";
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

describe("Login Form Component", () => {
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

    const usernameInput = screen.getByRole("textbox", { name: /username/ });
    await user.type(usernameInput, "test@test.com");
    const passwordInput = screen.getByLabelText(/password/);
    await user.type(passwordInput, "testpassword");
    const loginButton = screen.getByRole("button", { name: /로그인/ });
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

    const usernameInput = screen.getByRole("textbox", { name: /username/ });
    await user.type(usernameInput, "test@test.com");
    const passwordInput = screen.getByLabelText(/password/);
    await user.type(passwordInput, "testpassword");
    const loginButton = screen.getByRole("button", { name: /로그인/ });
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
        json: () =>
          Promise.resolve({
            message: "Invalid username or password",
          }),
      } as Response);
    });
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const usernameInput = screen.getByRole("textbox", { name: /username/ });
    await user.type(usernameInput, "test@test.com");
    const passwordInput = screen.getByLabelText(/password/);
    await user.type(passwordInput, "testpassword");
    const loginButton = screen.getByRole("button", { name: /로그인/ });
    await user.click(loginButton);

    const errorMessage = await screen.findByText(
      /Invalid username or password/,
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
