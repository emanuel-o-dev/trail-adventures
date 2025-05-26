import { ITrailFull } from "../../interfaces/ITrailFull.interface";
import { ITrailShort } from "../../interfaces/ITrailShort.interface";
import db from "./SQLiteDatabase";
import { trailsMock } from "../../mocks/trailFull";
import { ITrailDifficulty } from "../../interfaces/ITrailDifficulty";

export default class TrailRepository {
  constructor() {
    this.up();
  }

  public up() {
    try {
      db.runSync(`
        CREATE TABLE IF NOT EXISTS trailsDifficulty (
          difficulty TEXT PRIMARY KEY NOT NULL,
          label TEXT,                          
          seq INTEGER
        );
      `);

      db.runSync(`
        INSERT OR IGNORE INTO trailsDifficulty (difficulty, label, seq)
        VALUES
          ('easy', 'Fácil', 1),
          ('medium', 'Médio', 2),
          ('hard', 'Difícil', 3);
      `);

      db.runSync(`
        CREATE TABLE IF NOT EXISTS trails (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT,
          location TEXT,
          difficulty TEXT REFERENCES trailsDifficulty(difficulty),
          terrain TEXT,
          distance TEXT,
          duration TEXT,
          image TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (difficulty) REFERENCES trailsDifficulty(difficulty)
        );
      `);

      const result = db.getFirstSync("SELECT COUNT(id) as count FROM trails;");
      const count = (result as { count: number }).count;
      if (count === 0) {
        this.populate(trailsMock);
      }
    } catch (error) {
      console.log("Erro na migração:", error);
    }
  }

  public down() {
    db.runSync("DROP TABLE IF EXISTS trails;");
    db.runSync("DROP TABLE IF EXISTS trailsDifficulty;");
  }

  public create(trail: ITrailFull): boolean {
    const result = db.getFirstSync("SELECT MAX(id) as maxId FROM trails;") as {
      maxId: number | null;
    };

    const {
      id: id = (result.maxId ?? 0) + 1,
      name,
      description,
      location,
      difficulty,
      terrain,
      distance,
      duration,
      image,
    } = trail;
    const runResult = db.runSync(
      "INSERT INTO trails (id,name, description, location, difficulty, terrain, distance, duration, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        id,
        name,
        description,
        location,
        difficulty,
        terrain,
        distance,
        duration,
        image,
      ],
    );
    return runResult.changes > 0;
  }

  public all(): ITrailShort[] {
    return db.getAllSync<ITrailShort>(`
      SELECT id, name, difficulty, duration, terrain, distance, image, location
      FROM trails
      ORDER BY created_at DESC;
    `);
  }

  public findById(id: number): ITrailFull {
    const trail = db.getFirstSync<ITrailFull>(
      "SELECT * FROM trails WHERE id = ?;",
      [id],
    );
    if (!trail) {
      throw new Error(`Trail with id ${id} not found`);
    }
    return trail;
  }

  public populate(trails: ITrailFull[]) {
    trails.forEach((trail) => {
      this.create(trail);
    });
    console.log("Trails populated successfully");
  }

  public getDifficulties() {
    return db.getAllSync<ITrailDifficulty>(`
      SELECT difficulty, label, seq
      FROM trailsDifficulty
      ORDER BY seq;
    `);
  }
}
