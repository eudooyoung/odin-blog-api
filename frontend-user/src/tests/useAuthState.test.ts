import { useAuthState } from "@/hooks/useAuthState.ts";
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("useAuthState hook", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it("authenticate success", async () => {
    const mockUser = { id: 1, username: "test" };
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: mockUser }),
      } as Response);
    });
    const { result } = renderHook(() => useAuthState());

    await waitFor(() => {
      expect(result.current.userLoading).toBeFalsy();
    });

    expect(result.current.user).toEqual(mockUser);
  });

  it("authenticate fails with HTTP error", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        status: 401,
      } as Response);
    });
    const { result } = renderHook(() => useAuthState());

    await waitFor(() => {
      expect(result.current.userLoading).toBeFalsy();
    });

    expect(result.current.userError?.message).toMatch(/401/);
  });

  it("authenticate fails with fetch error", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.reject(new Error("Fetch Error"));
    });
    const { result } = renderHook(() => useAuthState());

    await waitFor(() => {
      expect(result.current.userLoading).toBeFalsy();
    });

    expect(result.current.userError?.message).toMatch(/Fetch Error/i);
  });

  it("abort request on unmount", () => {
    const abort = vi.fn();
    vi.stubGlobal(
      "AbortController",
      class MockAbort {
        signal = {};
        abort = abort;
      },
    );
    const { unmount } = renderHook(() => useAuthState());
    unmount();

    expect(abort).toHaveBeenCalled();
  });

  it("update token", async () => {
    localStorage.setItem("token", "old-token");
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: {} }),
      } as Response);
    });
    const { result } = renderHook(() => useAuthState());

    act(() => {
      result.current.setToken("new-token");
    });

    expect(result.current.token).toBe("new-token");
  });
});
