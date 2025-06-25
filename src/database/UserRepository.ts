import { User } from "../../schemas/User";
import FavoriteRepository from "./FavoritesRepository";
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

  public create(user: User) {
    const { name, email, password } = user;
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    db.runSync(
      "INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?);",
      [name, email, password, createdAt, updatedAt],
    );
  }
  public update(user: User) {
    const { id, name, email, password } = user;
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    db.runSync(
      "UPDATE users SET name = ?, email = ?, password = ?, updated_at = ? WHERE id = ?;",
      [name, email, password, updatedAt, id],
    );
  }

  public findById(id: string) {
    const result = db.getFirstSync<User>("SELECT * FROM trails WHERE id = ?;", [
      id,
    ]);
    return result;
  }
  public findByEmail(email: string) {
    const result = db.getFirstSync<User>(
      "SELECT * FROM users WHERE email = ?;",
      [email],
    );
    return result;
  }

  public login(email: string, password: string) {
    const result = db.getFirstSync<User>(
      "SELECT * FROM users WHERE email = ? AND password = ?;",
      [email, password],
    );
    return result;
  }
  populate() {
    const users: User[] = [
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
    const result = db.getAllSync<User>("SELECT * FROM users;");
    return result;
  }

  public saveTrail(userId: number, trailId: number): boolean {
    const favaoriteRepository = new FavoriteRepository();
    try {
      favaoriteRepository.create({
        user_id: userId,
        trail_id: trailId,
        created_at: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error("Erro ao salvar a trilha:", error);
      return false;
    }
  }
}
