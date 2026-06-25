import { AuthContext } from "@/context/AuthContext.ts";
import Profile from "@/pages/Profile.tsx";
import type { AuthContextValue } from "@/types/types.ts";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

describe("Profile Page", () => {
  it("user info displayed", () => {
    render(
      <AuthContext
        value={
          {
            token: "token",
            user: {
              username: "mock-username",
              displayName: "mock-display-name",
            },
          } as AuthContextValue
        }>
        <Profile />
      </AuthContext>,
    );

    const username = screen.getByText(/mock-username/i);
    expect(username).toBeInTheDocument();
    const displayName = screen.getByText(/mock-display-name/);
    expect(displayName).toBeInTheDocument();
  });

  it("change into edit mode when edit button clicked", async () => {
    const user = userEvent.setup();
    render(
      <AuthContext
        value={
          {
            token: "token",
            user: {
              username: "mock-username",
              displayName: "mock-display-name",
            },
          } as AuthContextValue
        }>
        <Profile />
      </AuthContext>,
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    await user.click(editButton);
    expect(editButton).not.toBeInTheDocument();
  });

  it("change display name", async () => {
    const user = userEvent.setup();
    const newDisplayName = "modified-display-name";
    render(
      <AuthContext
        value={
          {
            token: "token",
            user: {
              username: "mock-username",
              displayName: "mock-display-name",
            },
          } as AuthContextValue
        }>
        <Profile />
      </AuthContext>,
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    await user.click(editButton);

    const displayNameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });
    await user.type(displayNameInput, newDisplayName);
    const saveButton = screen.getByRole("button", { name: /save/i });
    await user.click(saveButton);
    const displayNameView = screen.getByText(`display name: ${newDisplayName}`);
    expect(displayNameView).toBeInTheDocument();
  });
});
