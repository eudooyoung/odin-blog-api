import Signup from "@/pages/Signup.tsx";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import * as router from "react-router";
import { describe, expect, it, vi } from "vitest";

const { mockUseSignup } = vi.hoisted(() => ({
  mockUseSignup: vi.fn(),
}));

vi.mock("@/hooks/useSignup.ts", () => ({
  useSignup: mockUseSignup,
}));

describe("Signup page", () => {
  it("signup success", async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    vi.spyOn(router, "useNavigate").mockImplementation(() => {
      return navigate;
    });
    mockUseSignup.mockImplementation(() => ({
      signup: () => {},
      signupLoading: false,
      signupValidationError: {},
      signupError: null,
    }));
    const mockSignupForm = {
      username: "mock@mock.com",
      password: "mock-password",
      confirmPassword: "mock-password",
      displayName: "mock-name",
    };
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    const signupForm = screen.getByRole("form", {
      name: /signup/i,
    }) as HTMLFormElement;
    for (const [name, value] of Object.entries(mockSignupForm)) {
      const input = signupForm.elements.namedItem(name) as Element;
      await user.type(input, value);
    }
    const signupButton = screen.getByRole("button", { name: /signup/i });
    await user.click(signupButton);

    expect(navigate).toHaveBeenCalledWith("/login", {
      state: { message: expect.stringMatching(/success/i) },
    });
  });

  it("signup button disabled while pending response", () => {
    mockUseSignup.mockImplementation(() => ({
      signup: () => {},
      signupLoading: true,
      signupValidationError: {},
      signupError: null,
    }));
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Signup />
      </MemoryRouter>,
    );

    const signupButton = screen.getByRole("button", { name: /signup/i });
    expect(signupButton).toBeDisabled();
  });

  it("signup fails with validation error", async () => {
    const user = userEvent.setup();
    mockUseSignup.mockImplementation(() => ({
      signup: () => {},
      signupLoading: false,
      signupValidationError: { username: "username already in use" },
      signupError: null,
    }));
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    const signupButton = screen.getByRole("button", { name: /signup/i });
    await user.click(signupButton);

    const errorMessage = await screen.findByText(/username already in use/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("signup fails with other error", async () => {
    const user = userEvent.setup();
    mockUseSignup.mockImplementation(() => ({
      signup: () => {},
      signupLoading: false,
      signupValidationError: {},
      signupError: new Error("Other Error"),
    }));
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    const signupButton = screen.getByRole("button", { name: /signup/i });
    await user.click(signupButton);

    const errorMessage = await screen.findByText(/other error/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
