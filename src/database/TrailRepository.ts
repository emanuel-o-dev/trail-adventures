import { number } from "zod";
import { ITrailFull } from "../../interfaces/ITrailFull.interface";
import { ITrailShort } from "../../interfaces/ITrailShort.interface";
import db from "./SQLiteDatabase";

export default class TrailRepository {
  constructor() {
    this.up();
  }

  public up() {
    try {
      db.runSync(
        "CREATE TABLE IF NOT EXISTS trailsDifficulty (type CHAR(1) PRIMARY KEY NOT NULL,seq INTEGER);",
      );
      db.runSync(
        "INSERT OR IGNORE INTO trailsDifficulty (type, seq) VALUES ('E', 1), ('M', 2), ('H', 3);",
      );
      db.runSync(
        "CREATE TABLE IF NOT EXISTS trails (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, location TEXT, difficulty CHAR(1) REFERENCES trailsDifficulty(difficulty), distance FLOAT, time INTEGER, image TEXT, created_at DATE, updated_at DATE);",
      );

      const result = Number(db.getFirstSync("SELECT COUNT(*) FROM trails;"));
      if (result === 0) {
        const trailPopulate = require("./TrailPopulate");
        const trailPopulateInstance = new trailPopulate.TrailPopulate();
        trailPopulateInstance.populate();
      }
    } catch (error) {
      console.log(error);
    }
  }

  public down() {
    db.runSync("DROP TABLE trails;");
  }

  public create(trail: ITrailFull) {
    const { name, description, location, difficulty, distance, time, image } =
      trail;
    db.runSync(
      "INSERT INTO trails (name, description, location, difficulty, distance, time, image, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [name, description, location, difficulty, distance, time, image],
    );
  }
  public all() {
    const result = db.getAllSync<ITrailShort>(
      "SELECT id, name, difficulty, time, type, distance,image, location FROM trails;",
    );
    return result;
  }

  public findById(id: string) {
    const result = db.getFirstSync<ITrailFull>(
      "SELECT * FROM trails WHERE id = ?;",
      [id],
    );
    return result;
  }
}
