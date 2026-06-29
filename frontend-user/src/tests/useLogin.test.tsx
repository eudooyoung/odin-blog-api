import { useLogin } from "@/hooks/useLogin.ts";
import type { LoginBody } from "@/types/types.ts";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockUseAuthContext } = vi.hoisted(() => ({
  mockUseAuthContext: vi.fn(),
}));

vi.mock("@/hooks/useAuthContext.ts", () => ({
  useAuthContext: mockUseAuthContext,
}));

describe("useLogin hook", () => {
  beforeEach(() => {
    mockUseAuthContext.mockReturnValue({
      setUser: vi.fn(),
      setToken: vi.fn(),
    });
  });

  it("login request success", async () => {
    const mockForm = {
      username: "mock-username",
      password: "mock-password",
    };
    const mockUser = { username: mockForm.username };
    const spyFetch = vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            user: mockUser,
            token: "token",
          }),
      } as Response);
    });
    const setUser = vi.fn();
    const setToken = vi.fn();
    mockUseAuthContext.mockReturnValue({
      setUser,
      setToken,
    });
    const { result } = renderHook(() => useLogin());

    expect(result.current.loginLoading).toBe(false);
    await act(() => result.current.login(mockForm));
    expect(spyFetch).toHaveBeenCalledWith(
      expect.stringMatching(/login/),
      expect.objectContaining({
        body: JSON.stringify(mockForm),
      }),
    );
    await waitFor(() => {
      expect(result.current.loginLoading).toBe(false);
    });
    expect(setUser).toHaveBeenCalledWith(mockUser);
    expect(setToken).toHaveBeenCalledWith("token");
    expect(localStorage.getItem("token")).toEqual("token");
    expect(result.current.loginError).toBeNull();
  });

  it("login request fails with authenticate error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 401,
      json: () =>
        Promise.resolve({
          error: { message: "Invalid username or password" },
        }),
    } as Response);
    const { result } = renderHook(() => useLogin());
    await act(() => result.current.login({} as LoginBody));
    await waitFor(() => {
      expect(result.current.loginLoading).toBe(false);
    });
    expect(result.current.loginError).toEqual({
      message: "Invalid username or password",
    });
  });
});
