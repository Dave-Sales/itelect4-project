import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSelection } from "../hooks/useSelection";

describe("useSelection", () => {
  it("starts empty and clears a selected value", () => {
    const { result } = renderHook(() => useSelection<string>());

    expect(result.current.selectedValue).toBeNull();

    act(() => {
      result.current.setSelectedValue("item-123");
    });
    expect(result.current.selectedValue).toBe("item-123");

    act(() => {
      result.current.clearSelection();
    });
    expect(result.current.selectedValue).toBeNull();
  });
});
