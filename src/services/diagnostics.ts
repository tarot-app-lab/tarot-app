export type DiagnosticSeverity = "debug" | "info" | "warn" | "error";

export type DiagnosticEvent = {
  name: string;
  severity: DiagnosticSeverity;
  message: string;
  timestamp: string;
  context?: Record<string, string | number | boolean | null>;
};

export type DiagnosticReporter = {
  report(event: DiagnosticEvent): void;
  getEvents(): readonly DiagnosticEvent[];
  clear(): void;
};

const sensitiveKeyPattern = /token|secret|password|api[_-]?key|authorization/i;

export function sanitizeDiagnosticContext(
  context: Record<string, unknown> = {},
) {
  return Object.fromEntries(
    Object.entries(context).map(([key, value]) => {
      if (sensitiveKeyPattern.test(key)) {
        return [key, "[redacted]"];
      }

      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value === null
      ) {
        return [key, value];
      }

      return [key, String(value)];
    }),
  ) as DiagnosticEvent["context"];
}

export function createInMemoryDiagnosticReporter(): DiagnosticReporter {
  const events: DiagnosticEvent[] = [];

  return {
    report(event) {
      events.push({
        ...event,
        context: sanitizeDiagnosticContext(event.context),
      });
    },
    getEvents() {
      return [...events];
    },
    clear() {
      events.length = 0;
    },
  };
}

export function createDiagnosticEvent(
  name: string,
  severity: DiagnosticSeverity,
  message: string,
  context?: Record<string, unknown>,
): DiagnosticEvent {
  return {
    name,
    severity,
    message,
    timestamp: new Date().toISOString(),
    context: sanitizeDiagnosticContext(context),
  };
}
