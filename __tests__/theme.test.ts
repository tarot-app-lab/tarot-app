import { appTheme } from "@/shared/theme";

describe("app theme", () => {
  it("defines light and dark color schemes", () => {
    expect(appTheme.colors.light.background).toBeDefined();
    expect(appTheme.colors.dark.background).toBeDefined();
  });

  it("defines shared spacing and typography tokens", () => {
    expect(appTheme.spacing.md).toBe(16);
    expect(appTheme.typography.body.fontSize).toBe(16);
  });
});
