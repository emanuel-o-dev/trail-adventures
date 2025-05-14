import db from "./SQLiteDatabase";

export type Favorites = {
  id?: number;
  user_id: string;
  trail_id: string;
  created_at: Date;
};

export default class FavoriteRepository {
  constructor() {
    this.up();
  }

  public async up() {
    //user_id references users(id)
    //trail_id references trails(id)
    await db.runAsync(
      "CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT REFERENCES users(id), trail_id TEXT REFERENCES trails(id), created_at DATE);",
    );
  }
  public async down() {
    await db.runAsync("DROP TABLE favorites;");
  }

  public async create(favorite: Favorites) {
    const { user_id, trail_id } = favorite;
    const createdAt = new Date().toISOString();
    await db.runAsync(
      "INSERT INTO favorites (user_id, trail_id, created_at) VALUES (?, ?, ?);",
      [user_id, trail_id, createdAt],
    );
  }

  public async delete(favorite: Favorites) {
    const { user_id, trail_id } = favorite;
    await db.runAsync(
      "DELETE FROM favorites WHERE user_id = ? AND trail_id = ?;",
      [user_id, trail_id],
    );
  }
  public async all(user_id: string) {
    const result = await db.getAllAsync<Favorites>(
      "SELECT * FROM favorites WHERE user_id = ?;",
      [user_id],
    );
    return result;
  }
}
