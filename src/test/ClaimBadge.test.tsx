import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ClaimBadge from "../components/ClaimBadge";
import type { Claim } from "../types";

describe("ClaimBadge", () => {
  it("shows the submitted status and notes from the claim", () => {
    const claim: Claim = {
      id: "claim-123",
      itemId: "item-456",
      claimedByUserId: "user-789",
      claimedAt: new Date("2026-10-29T00:00:00.000Z"),
      notes: "Please contact me after verification.",
    };

    render(<ClaimBadge claim={claim} />);

    expect(screen.getByText("Submitted")).toBeInTheDocument();
    expect(
      screen.getByText("Please contact me after verification.")
    ).toBeInTheDocument();
  });
});
