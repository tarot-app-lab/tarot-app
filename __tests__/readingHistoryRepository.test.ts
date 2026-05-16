import {
  createReadingHistoryRepository,
  toReadingHistoryRecord,
  type QueryExecutor,
  type ReadingHistoryRow,
} from "@/db/repositories/readingHistory.repository";

describe("reading history repository", () => {
  it("serializes cards and writes a parameterized insert", async () => {
    const calls: Array<{ sql: string; params?: readonly unknown[] }> = [];
    const executor: QueryExecutor = {
      async execute(sql, params) {
        calls.push({ sql, params });
      },
      async query() {
        return [];
      },
    };

    const repository = createReadingHistoryRepository(executor);

    await repository.save({
      id: "reading-1",
      spreadId: "one-card",
      question: "What should I notice today?",
      notes: null,
      cards: [
        {
          cardId: "major-00",
          position: "present",
          orientation: "upright",
        },
      ],
      createdAt: "2026-05-16T00:00:00.000Z",
    });

    expect(calls).toHaveLength(1);
    expect(calls[0].sql).toContain("INSERT INTO reading_history");
    expect(calls[0].params).toEqual([
      "reading-1",
      "one-card",
      "What should I notice today?",
      JSON.stringify([
        {
          cardId: "major-00",
          position: "present",
          orientation: "upright",
        },
      ]),
      null,
      "2026-05-16T00:00:00.000Z",
      "2026-05-16T00:00:00.000Z",
    ]);
  });

  it("maps SQLite rows into domain records", () => {
    const row: ReadingHistoryRow = {
      id: "reading-1",
      spread_id: "one-card",
      question: null,
      cards_json: JSON.stringify([
        {
          cardId: "major-00",
          position: "present",
          orientation: "reversed",
        },
      ]),
      notes: "Review later",
      created_at: "2026-05-16T00:00:00.000Z",
      updated_at: "2026-05-16T00:00:00.000Z",
    };

    expect(toReadingHistoryRecord(row)).toEqual({
      id: "reading-1",
      spreadId: "one-card",
      question: null,
      cards: [
        {
          cardId: "major-00",
          position: "present",
          orientation: "reversed",
        },
      ],
      notes: "Review later",
      createdAt: "2026-05-16T00:00:00.000Z",
      updatedAt: "2026-05-16T00:00:00.000Z",
    });
  });

  it("uses bounded list queries and targeted deletes", async () => {
    const calls: Array<{ type: "execute" | "query"; sql: string; params?: readonly unknown[] }> = [];
    const executor: QueryExecutor = {
      async execute(sql, params) {
        calls.push({ type: "execute", sql, params });
      },
      async query(sql, params) {
        calls.push({ type: "query", sql, params });
        return [];
      },
    };

    const repository = createReadingHistoryRepository(executor);

    await repository.listRecent(20);
    await repository.deleteById("reading-1");

    expect(calls[0]).toMatchObject({
      type: "query",
      params: [20],
    });
    expect(calls[0].sql).toContain("ORDER BY created_at DESC");
    expect(calls[0].sql).toContain("LIMIT ?");
    expect(calls[1]).toEqual({
      type: "execute",
      sql: "DELETE FROM reading_history WHERE id = ?;",
      params: ["reading-1"],
    });
  });
});
