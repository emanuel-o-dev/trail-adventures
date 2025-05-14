import db from "./SQLiteDatabase";

export type Visited = {
  id?: number;
  user_id: string;
  trail_id: string;
  visited_at: Date;
};

export default class VisitedRepository {
  constructor() {
    this.up();
  }

  public async up() {
    //user_id references users(id)
    //trail_id references trails(id)
    await db.runAsync(
      "CREATE TABLE IF NOT EXISTS visited (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT REFERENCES users(id), trail_id TEXT REFERENCES trails(id), visited_at DATE);",
    );
  }
  public async down() {
    await db.runAsync("DROP TABLE visited;");
  }

  public async create(visited: Visited) {
    const { user_id, trail_id } = visited;
    const visitedAt = new Date().toISOString();
    await db.runAsync(
      "INSERT INTO visited (user_id, trail_id, visited_at) VALUES (?, ?, ?);",
      [user_id, trail_id, visitedAt],
    );
  }

  public async delete(visited: Visited) {
    const { user_id, trail_id } = visited;
    await db.runAsync(
      "DELETE FROM visited WHERE user_id = ? AND trail_id = ?;",
      [user_id, trail_id],
    );
  }
  public async all(user_id: string) {
    const result = await db.getAllAsync<Visited>(
      "SELECT * FROM visited WHERE user_id = ?;",
      [user_id],
    );
    return result;
  }
}
