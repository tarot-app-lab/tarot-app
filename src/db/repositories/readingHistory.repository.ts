import type { SqlParameters } from "../database";

export type ReadingHistoryCard = {
  cardId: string;
  position: string;
  orientation: "upright" | "reversed";
};

export type ReadingHistoryRecord = {
  id: string;
  spreadId: string;
  question: string | null;
  cards: readonly ReadingHistoryCard[];
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateReadingHistoryInput = Omit<
  ReadingHistoryRecord,
  "createdAt" | "updatedAt"
> & {
  createdAt?: string;
  updatedAt?: string;
};

export type ReadingHistoryRow = {
  id: string;
  spread_id: string;
  question: string | null;
  cards_json: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type QueryExecutor = {
  execute(sql: string, params?: SqlParameters): Promise<void>;
  query<T>(sql: string, params?: SqlParameters): Promise<readonly T[]>;
};

export function toReadingHistoryRecord(
  row: ReadingHistoryRow,
): ReadingHistoryRecord {
  return {
    id: row.id,
    spreadId: row.spread_id,
    question: row.question,
    cards: JSON.parse(row.cards_json) as ReadingHistoryCard[],
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function createReadingHistoryRepository(executor: QueryExecutor) {
  return {
    async save(input: CreateReadingHistoryInput) {
      const now = new Date().toISOString();
      const createdAt = input.createdAt ?? now;
      const updatedAt = input.updatedAt ?? createdAt;

      await executor.execute(
        `INSERT INTO reading_history (
          id,
          spread_id,
          question,
          cards_json,
          notes,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
          input.id,
          input.spreadId,
          input.question,
          JSON.stringify(input.cards),
          input.notes,
          createdAt,
          updatedAt,
        ],
      );
    },

    async findById(id: string) {
      const rows = await executor.query<ReadingHistoryRow>(
        `SELECT
          id,
          spread_id,
          question,
          cards_json,
          notes,
          created_at,
          updated_at
        FROM reading_history
        WHERE id = ?
        LIMIT 1;`,
        [id],
      );

      return rows[0] ? toReadingHistoryRecord(rows[0]) : null;
    },

    async listRecent(limit = 50) {
      const rows = await executor.query<ReadingHistoryRow>(
        `SELECT
          id,
          spread_id,
          question,
          cards_json,
          notes,
          created_at,
          updated_at
        FROM reading_history
        ORDER BY created_at DESC
        LIMIT ?;`,
        [limit],
      );

      return rows.map(toReadingHistoryRecord);
    },

    async deleteById(id: string) {
      await executor.execute("DELETE FROM reading_history WHERE id = ?;", [id]);
    },
  };
}
