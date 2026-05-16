export type Migration = {
  id: string;
  description: string;
  statements: readonly string[];
};

export const migrations = [
  {
    id: "001_create_schema_migrations",
    description: "Track local SQLite schema migrations.",
    statements: [
      `CREATE TABLE IF NOT EXISTS schema_migrations (
        id TEXT PRIMARY KEY NOT NULL,
        applied_at TEXT NOT NULL
      );`,
    ],
  },
  {
    id: "002_create_reading_history",
    description: "Create local reading history storage.",
    statements: [
      `CREATE TABLE IF NOT EXISTS reading_history (
        id TEXT PRIMARY KEY NOT NULL,
        spread_id TEXT NOT NULL,
        question TEXT,
        cards_json TEXT NOT NULL,
        notes TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );`,
      `CREATE INDEX IF NOT EXISTS idx_reading_history_created_at
        ON reading_history (created_at DESC);`,
    ],
  },
] as const satisfies readonly Migration[];
