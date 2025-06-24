import { TrailFull } from "../../schemas/TrailFull";
import db from "./SQLiteDatabase";
import { trailsMock } from "../../mocks/trailFull";
import { TrailDifficulty } from "../../schemas/TrailDifficulty";
import { TrailShort } from "../../schemas/TrailShort";

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

  public create(trail: TrailFull): boolean {
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

  public all(): TrailShort[] {
    return db.getAllSync<TrailShort>(`
    SELECT 
      t.id, 
      t.name, 
      t.difficulty, 
      d.label as difficultyLabel,
      t.duration, 
      t.terrain, 
      t.distance, 
      t.image, 
      t.location
    FROM trails t
    JOIN trailsDifficulty d ON t.difficulty = d.difficulty
    ORDER BY t.created_at DESC;
  `);
  }

  public findById(id: number): TrailFull {
    const trail = db.getFirstSync<TrailFull & { difficultyLabel: string }>(
      `
    SELECT 
      t.*, 
      d.label as difficultyLabel
    FROM trails t
    JOIN trailsDifficulty d ON t.difficulty = d.difficulty
    WHERE t.id = ?;
    `,
      [id],
    );

    if (!trail) {
      throw new Error(`Trail with id ${id} not found`);
    }

    return trail;
  }

  public populate(trails: TrailFull[]) {
    trails.forEach((trail) => {
      this.create(trail);
    });
    console.log("Trails populated successfully");
  }

  public getDifficulties() {
    return db.getAllSync<TrailDifficulty>(`
      SELECT difficulty, label, seq
      FROM trailsDifficulty
      ORDER BY seq;
    `);
  }
}
