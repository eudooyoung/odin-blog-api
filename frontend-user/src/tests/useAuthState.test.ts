import { useAuthState } from "@/hooks/useAuthState.ts";
import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("useAuthState hook", () => {
  it("authenticate success", async () => {
    localStorage.setItem("token", "test-token");
    const mockUser = { id: 1, username: "test" };
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: mockUser }),
      } as Response);
    });
    const { result } = renderHook(() => useAuthState());

    await waitFor(() => {
      expect(result.current.userLoading).toBe(false);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.userError).toBeNull();
    expect(result.current.token).toBe("test-token");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("update new token", async () => {
    localStorage.setItem("token", "old-token");
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: null }),
      } as Response);
    });
    const { result } = renderHook(() => useAuthState());

    await waitFor(() => {
      expect(result.current.userLoading).toBe(false);
    });
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.setToken("new-token");
    });
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });
    expect(fetchSpy).toHaveBeenLastCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: {
          Authorization: "new-token",
        },
      }),
    );
    expect(result.current.token).toBe("new-token");
  });
});
