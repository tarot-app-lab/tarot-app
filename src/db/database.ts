import { migrations } from "./migrations";

export const databaseName = "tarot.db";

export const databaseSchemaVersion = migrations.length;

export type SqlParameters = readonly unknown[];

export type SqlStatement = {
  sql: string;
  params?: SqlParameters;
};

export type SqlExecutor = {
  execute(statement: SqlStatement): Promise<void>;
};

export function getPendingMigrations(
  appliedMigrationIds: readonly string[],
) {
  const applied = new Set(appliedMigrationIds);

  return migrations.filter((migration) => !applied.has(migration.id));
}

export async function applyPendingMigrations(
  executor: SqlExecutor,
  appliedMigrationIds: readonly string[],
) {
  const pendingMigrations = getPendingMigrations(appliedMigrationIds);

  for (const migration of pendingMigrations) {
    for (const statement of migration.statements) {
      await executor.execute({ sql: statement });
    }

    await executor.execute({
      sql: "INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?);",
      params: [migration.id, new Date().toISOString()],
    });
  }

  return pendingMigrations.map((migration) => migration.id);
}
