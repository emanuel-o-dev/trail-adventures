import { IUser } from "../../interfaces/IUser.interface";
import db from "./SQLiteDatabase";

export default class UserRepository {
  constructor() {
    this.up();
  }

  public async up() {
    await db.runAsync(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT, created_at DATE, updated_at DATE);",
    );
  }
  public async down() {
    await db.runAsync("DROP TABLE users;");
  }

  public async create(user: IUser) {
    const { name, email, password } = user;
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    await db.runAsync(
      "INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?);",
      [name, email, password, createdAt, updatedAt],
    );
  }
  public async update(user: IUser) {
    const { id, name, email, password } = user;
    const updatedAt = new Date().toISOString();
    await db.runAsync(
      "UPDATE users SET name = ?, email = ?, password = ?, updated_at = ? WHERE id = ?;",
      [name, email, password, updatedAt, id],
    );
  }

  public async findById(id: string) {
    const result = await db.getFirstAsync<IUser>(
      "SELECT * FROM trails WHERE id = ?;",
      [id],
    );
    return result;
  }
}
