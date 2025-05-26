import { IUser } from "../../interfaces/IUser.interface";
import db from "./SQLiteDatabase";

export default class UserRepository {
  constructor() {
    this.up();
  }

  public up() {
    try {
      db.runSync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT UNIQUE,
          password TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);

      const result = db.getFirstSync("SELECT COUNT(id) as count FROM users;");
      const count = (result as { count: number }).count;
      if (count === 0) {
        this.populate();
      }
    } catch (error) {
      console.log("Erro na migração:", error);
    }
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
    const createdAt = new Date().toISOString();
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
  public findByEmail(email: string) {
    const result = db.getFirstSync<IUser>(
      "SELECT * FROM users WHERE email = ?;",
      [email],
    );
    return result;
  }

  public login(email: string, password: string) {
    const result = db.getFirstSync<IUser>(
      "SELECT * FROM users WHERE email = ? AND password = ?;",
      [email, password],
    );
    return result;
  }
  populate() {
    const users: IUser[] = [
      {
        id: 1,
        name: "Lucas",
        email: "test@test.com",
        password: "123456",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    this.create(users[0]);
  }

  public all() {
    const result = db.getAllSync<IUser>("SELECT * FROM users;");
    return result;
  }
}
