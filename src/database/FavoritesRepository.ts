import { z } from "zod";
import { TrailSaved } from "../../schemas/TrailSaved";
import db from "./SQLiteDatabase";

export const Favorites = z.object({
  id: z.number().optional(),
  user_id: z.number(),
  trail_id: z.number(),
  created_at: z
    .date()
    .default(() => new Date())
    .transform((date) => date.toISOString()),
});
export type Favorites = z.infer<typeof Favorites>;

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
    const { user_id, trail_id, created_at } = favorite;
    return (
      db.runSync(
        "DELETE FROM favorites WHERE user_id = ? AND trail_id = ? AND created_at = ?;",
        [user_id, trail_id, created_at],
      ).changes > 0
    );
  }
  public getSavedTrails(user_id: number): TrailSaved[] {
    const trails = db.getAllSync<TrailSaved>(
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
