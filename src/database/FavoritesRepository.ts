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

  public up() {
    db.runSync(
      "CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT REFERENCES users(id), trail_id TEXT REFERENCES trails(id), created_at DATE);",
    );
  }
  public down() {
    db.runSync("DROP TABLE favorites;");
  }

  public create(favorite: Favorites) {
    const { user_id, trail_id } = favorite;
    const createdAt = new Date().toISOString();
    db.runSync(
      "INSERT INTO favorites (user_id, trail_id, created_at) VALUES (?, ?, ?);",
      [user_id, trail_id, createdAt],
    );
  }

  public deleteById(favorite: Favorites) {
    const { user_id, trail_id } = favorite;
    db.runSync("DELETE FROM favorites WHERE user_id = ? AND trail_id = ?;", [
      user_id,
      trail_id,
    ]);
  }
  public getSavedTrails(user_id: string) {
    const result = db.getAllSync<Favorites>(
      "SELECT * FROM favorites WHERE user_id = ?;",
      [user_id],
    );
    return result;
  }
  public clearSavedTrails(user_id: string) {
    try {
      db.runSync("DELETE FROM favorites WHERE user_id = ?;", [user_id]);
      return true;
    } catch (error) {
      console.error("Error clearing saved trails:", error);
      return false;
    }
  }
}
