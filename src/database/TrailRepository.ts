import { ITrailFull } from "../../interfaces/ITrailFull.interface";
import { ITrailShort } from "../../interfaces/ITrailShort.interface";
import db from "./SQLiteDatabase";

const trailsMock = {
  id: "1",
  name: "Monte Tamalpais",
  difficulty: "Moderado",
  time: "2 horas",
  type: "Trilha",
  distance: "7,2 km",
  image: require("../../assets/mountain.png"),
  description:
    "Uma trilha cênica que oferece vistas espetaculares da Baía de São Francisco, perfeita para caminhantes intermediários que buscam um desafio moderado com paisagens deslumbrantes.",
  location: "Califórnia, EUA",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
export default class TrailRepository {
  constructor() {
    this.up();
  }

  public async up() {
    try {
      await db.runAsync(
        "CREATE TABLE IF NOT EXISTS trailsDifficulty (type CHAR(1) PRIMARY KEY NOT NULL,seq INTEGER);",
      );
      await db.runAsync(
        "INSERT OR IGNORE INTO trailsDifficulty (type, seq) VALUES ('E', 1), ('M', 2), ('H', 3);",
      );
      await db.runAsync(
        "CREATE TABLE IF NOT EXISTS trails (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT unique, location TEXT, difficulty CHAR(1) REFERENCES trailsDifficulty(difficulty), distance FLOAT, time INTEGER, image TEXT, created_at DATE, updated_at DATE);",
      );
      await this.create(trailsMock);
    } catch (error) {
      console.log(error);
    }
  }

  public async down() {
    await db.runAsync("DROP TABLE trails;");
  }

  public async create(trail: ITrailFull) {
    const { name, description, location, difficulty, distance, time, image } =
      trail;
    await db.runAsync(
      "INSERT INTO trails (name, description, location, difficulty, distance, time, image, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [name, description, location, difficulty, distance, time, image],
    );
  }
  public async all() {
    const result = await db.getAllAsync<ITrailShort>(
      "SELECT id, name, difficulty, time, type, distance,image, location FROM trails;",
    );
    return result;
  }

  public async findById(id: string) {
    const result = await db.getFirstAsync<ITrailFull>(
      "SELECT * FROM trails WHERE id = ?;",
      [id],
    );
    return result;
  }
}
