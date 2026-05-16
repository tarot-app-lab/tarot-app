import {
  applyPendingMigrations,
  databaseName,
  databaseSchemaVersion,
  getPendingMigrations,
  type SqlStatement,
} from "@/db/database";
import { migrations } from "@/db/migrations";

describe("database migrations", () => {
  it("uses the expected local SQLite database name", () => {
    expect(databaseName).toBe("tarot.db");
  });

  it("keeps schema version aligned with migration count", () => {
    expect(databaseSchemaVersion).toBe(migrations.length);
  });

  it("returns only unapplied migrations in declaration order", () => {
    const pending = getPendingMigrations(["001_create_schema_migrations"]);

    expect(pending.map((migration) => migration.id)).toEqual([
      "002_create_reading_history",
    ]);
  });

  it("applies pending migrations and records them", async () => {
    const statements: SqlStatement[] = [];

    const applied = await applyPendingMigrations(
      {
        async execute(statement) {
          statements.push(statement);
        },
      },
      ["001_create_schema_migrations"],
    );

    expect(applied).toEqual(["002_create_reading_history"]);
    expect(statements.some((statement) => statement.sql.includes("CREATE TABLE IF NOT EXISTS reading_history"))).toBe(true);
    expect(statements.at(-1)).toMatchObject({
      sql: "INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?);",
      params: ["002_create_reading_history", expect.any(String)],
    });
  });
});
