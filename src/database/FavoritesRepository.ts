import { ITrailSaved } from "../../interfaces/ITrailSaved";
import db from "./SQLiteDatabase";

export type Favorites = {
  id?: number;
  user_id: number;
  trail_id: number;
  created_at?: string;
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
    return (
      db.runSync("DELETE FROM favorites WHERE user_id = ? AND trail_id = ?;", [
        user_id,
        trail_id,
      ]).changes > 0
    );
  }
  public getSavedTrails(user_id: number): ITrailSaved[] {
    const trails = db.getAllSync<ITrailSaved>(
      `
    SELECT t.id, t.name, t.location, f.created_at AS dateVisited 
    FROM favorites f
    JOIN trails t ON f.trail_id = t.id
    WHERE f.user_id = ?
    ORDER BY f.created_at DESC;
    `,
      [user_id],
    );
    return trails;
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
