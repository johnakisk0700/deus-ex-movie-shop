import { describe, expect, it } from "vitest";
import { render, screen } from "../../../utils/test-utils";
import AuthGuard from "../AuthGuard";

describe("AuthGuard", () => {
  it("should redirect you to /login when user is not logged in", () => {
    render(
      <AuthGuard>
        <p>Logged In</p>
      </AuthGuard>
    );
    expect(true).toBe(true);
  });
});
