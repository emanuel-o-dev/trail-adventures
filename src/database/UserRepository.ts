import { IUser } from "../../interfaces/IUser.interface";
import db from "./SQLiteDatabase";

export default class UserRepository {
  constructor() {
    this.up();
  }

  public up() {
    db.runSync(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT, created_at DATE, updated_at DATE);",
    );
  }
  public down() {
    db.runSync("DROP TABLE users;");
  }

  public create(user: IUser) {
    const { name, email, password } = user;
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    db.runSync(
      "INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?);",
      [name, email, password, createdAt, updatedAt],
    );
  }
  public update(user: IUser) {
    const { id, name, email, password } = user;
    const updatedAt = new Date().toISOString();
    db.runSync(
      "UPDATE users SET name = ?, email = ?, password = ?, updated_at = ? WHERE id = ?;",
      [name, email, password, updatedAt, id],
    );
  }

  public findById(id: string) {
    const result = db.getFirstSync<IUser>(
      "SELECT * FROM trails WHERE id = ?;",
      [id],
    );
    return result;
  }
}
