import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Login from "../pages/Login";

describe("Login", () => {
  it("shows validation messages and does not submit invalid input", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 8 characters.")
      ).toBeInTheDocument();
    });
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });
});
