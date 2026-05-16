import {
  createDiagnosticEvent,
  createInMemoryDiagnosticReporter,
  sanitizeDiagnosticContext,
} from "@/services/diagnostics";

describe("diagnostics", () => {
  it("redacts sensitive context keys", () => {
    expect(
      sanitizeDiagnosticContext({
        screen: "history",
        apiKey: "secret-value",
        authToken: "token-value",
        retryCount: 2,
      }),
    ).toEqual({
      screen: "history",
      apiKey: "[redacted]",
      authToken: "[redacted]",
      retryCount: 2,
    });
  });

  it("stores immutable diagnostic event snapshots", () => {
    const reporter = createInMemoryDiagnosticReporter();

    reporter.report(
      createDiagnosticEvent("db.migration_failed", "error", "Migration failed", {
        migrationId: "002_create_reading_history",
        password: "do-not-store",
      }),
    );

    const firstRead = reporter.getEvents();
    const secondRead = reporter.getEvents();

    expect(firstRead).toEqual(secondRead);
    expect(firstRead[0]).toMatchObject({
      name: "db.migration_failed",
      severity: "error",
      message: "Migration failed",
      context: {
        migrationId: "002_create_reading_history",
        password: "[redacted]",
      },
    });

    expect(() => {
      (firstRead as unknown[]).push("mutated");
    }).not.toThrow();
    expect(reporter.getEvents()).toHaveLength(1);
  });
});
