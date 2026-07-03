import { useProfile } from "@/hooks/useProfile.ts";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockUseAuthContext } = vi.hoisted(() => ({
  mockUseAuthContext: vi.fn(),
}));

vi.mock("@/hooks/useAuthContext", () => ({
  useAuthContext: mockUseAuthContext,
}));

describe("useProfile hook", () => {
  beforeEach(() => {
    mockUseAuthContext.mockReturnValue({
      token: "token",
    });
  });

  it("update profile request successful", async () => {
    const mockNewDisplayName = { displayName: "new-name" };
    const spyFetch = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 201,
      json: () => Promise.resolve({}),
    } as Response);
    const { result } = renderHook(() => useProfile(1));

    expect(result.current.profileLoading).toBe(false);
    expect(result.current.profileValidationError).toEqual({});
    expect(result.current.profileError).toBeNull();
    await act(() => result.current.updateProfile(mockNewDisplayName));
    await waitFor(() => {
      expect(result.current.profileLoading).toBe(false);
    });
    expect(spyFetch).toHaveBeenCalledWith(
      expect.stringContaining("/posts/1/comments"),
      expect.objectContaining({
        method: "post",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "token",
        }),
        body: JSON.stringify(mockNewDisplayName),
      }),
    );
    expect(result.current.profileValidationError).toEqual({});
    expect(result.current.profileError).toBeNull();
  });
});
