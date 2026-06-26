import { useSignup } from "@/hooks/useSignup.ts";
import type { SignupBody } from "@/types/types.ts";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";

describe("useSignup hook", () => {
  it("signup success", async () => {
    const mockForm = {
      username: "mock@mock.com",
      password: "mock-password",
    };
    const mockFetch = vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        status: 201,
        json: () => Promise.resolve(mockForm),
      } as Response);
    });
    const { result } = renderHook(() => useSignup());

    await act(() => result.current.signup(mockForm as SignupBody));
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify(mockForm),
      }),
    );
    await waitFor(() => {
      expect(result.current.signupLoading).toBe(false);
    });
    expect(result.current.signupValidationError).toEqual({});
    expect(result.current.signupError).toBeNull();
  });

  it("signup fails with validation error", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 400,
        json: () =>
          Promise.resolve({
            errors: [{ path: "username", msg: "username already in use" }],
          }),
      } as Response);
    });
    const { result } = renderHook(() => useSignup());
    await act(() => result.current.signup({} as SignupBody));
    await waitFor(() => {
      expect(result.current.signupLoading).toBe(false);
    });
    expect(result.current.signupValidationError).toEqual({
      username: "username already in use",
    });
  });

  it("signup fails with server error", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: { message: "Server Error" } }),
      } as Response);
    });
    const { result } = renderHook(() => useSignup());
    await act(() => result.current.signup({} as SignupBody));
    await waitFor(() => {
      expect(result.current.signupLoading).toBe(false);
    });
    expect(result.current.signupError?.message).toMatch(/server error/i);
  });

  it("signup fails with fetch error", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.reject(new Error("Fetch Error"));
    });
    const { result } = renderHook(() => useSignup());
    await act(() => result.current.signup({} as SignupBody));
    await waitFor(() => {
      expect(result.current.signupLoading).toBe(false);
    });
    expect(result.current.signupError?.message).toMatch(/fetch error/i);
  });
});
