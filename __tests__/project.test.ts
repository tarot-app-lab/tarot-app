import packageJson from "../package.json";

describe("project setup", () => {
  it("keeps the Expo Router entrypoint configured", () => {
    expect(packageJson.main).toBe("expo-router/entry");
  });

  it("keeps required quality scripts available", () => {
    expect(packageJson.scripts.typecheck).toBe("tsc --noEmit");
    expect(packageJson.scripts.test).toBe("jest");
  });
});
