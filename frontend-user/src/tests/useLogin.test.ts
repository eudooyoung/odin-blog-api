import useLogin from "@/hooks/useLogin.ts";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";

describe("useLogin hook", () => {
  it("login request success", async () => {
    const mockForm = {
      username: "mock-username",
      password: "mock-password",
    };
    const spyFetch = vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(),
      } as Response);
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
    expect(result.current.loginError).toBeNull();
  });
});
