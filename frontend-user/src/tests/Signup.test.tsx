import Login from "@/pages/Login.tsx";
import Signup from "@/pages/Signup.tsx";
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

describe("Signup page", () => {
  it("signup success", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        status: 201,
        ok: true,
        json: () =>
          Promise.resolve({
            user: { usename: "test@test.com", displayName: "test-display" },
          }),
      } as Response);
    });
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </MemoryRouter>,
    );

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    await user.type(usernameInput, "test@test.com");
    const pwInput = screen.getByLabelText(/password$/i);
    await user.type(pwInput, "qwerQWER1234!@#$");
    const pwConfirmInput = screen.getByLabelText(/confirm$/i);
    await user.type(pwConfirmInput, "qwerQWER1234!@#$");
    const displayNameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });
    await user.type(displayNameInput, "test-display");
    const signupButton = screen.getByRole("button", { name: /signup/i });
    await user.click(signupButton);

    const homeTitle = await screen.findByRole("heading", { name: /login/i });
    expect(homeTitle).toBeInTheDocument();
    const signupSuccessMessage = screen.getByRole("heading", {
      name: /success/i,
    });
    expect(signupSuccessMessage).toBeInTheDocument();
  });

  it("server error", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        status: 500,
        json: () =>
          Promise.resolve({
            message: "username is already in use",
          }),
      } as Response);
    });
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    await user.type(usernameInput, "test@test.com");
    const pwInput = screen.getByLabelText(/password$/i);
    await user.type(pwInput, "qwerQWER1234!@#$");
    const pwConfirmInput = screen.getByLabelText(/confirm$/i);
    await user.type(pwConfirmInput, "qwerQWER1234!@#$");
    const displayNameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });
    await user.type(displayNameInput, "test-display");
    const signupButton = screen.getByRole("button", { name: /signup/i });
    await user.click(signupButton);

    const errorMessage = await screen.findByText(/username is already in use/);
    expect(errorMessage).toBeInTheDocument();
  });

  it("client error", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.reject(new Error("client error"));
    });
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    await user.type(usernameInput, "test@test.com");
    const pwInput = screen.getByLabelText(/password$/i);
    await user.type(pwInput, "qwerQWER1234!@#$");
    const pwConfirmInput = screen.getByLabelText(/confirm$/i);
    await user.type(pwConfirmInput, "qwerQWER1234!@#$");
    const displayNameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });
    await user.type(displayNameInput, "test-display");
    const signupButton = screen.getByRole("button", { name: /signup/i });
    await user.click(signupButton);

    const errorMessage = await screen.findByText(/client error/);
    expect(errorMessage).toBeInTheDocument();
  });
});
