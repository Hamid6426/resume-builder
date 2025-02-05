import connectDB from "@/config/dbConfig";
import bcrypt from "bcrypt";

class UserRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createUser(user) {
    const { name, username, email, password } = user;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await this.client`
      INSERT INTO users (name, username, email, password)
      VALUES (${name}, ${username}, ${email}, ${hashedPassword})
      RETURNING *;
    `;
    return result[0];
  }

  async loginAdmin(email, password) {
    const [result] = await this.client`
      SELECT * FROM admin WHERE email = ${email};
    `;
    if (result && (await bcrypt.compare(password, result.password))) {
      return result;
    } else {
      throw new Error("Invalid credentials");
    }
  }

  async getAllUsers() {
    const result = await this.client`
      SELECT * FROM users;
    `;
    return result;
  }

  async getUserById(id) {
    const result = await this.client`
      SELECT * FROM users WHERE id = ${id};
    `;
    return result[0];
  }

  async getUserByEmail(email) {
    const result = await this.client`
      SELECT * FROM users WHERE email = ${email};
    `;
    return result[0];
  }

  async getUserByUsername(username) {
    const result = await this.client`
      SELECT * FROM users WHERE username = ${username};
    `;
    return result[0];
  }

  async updateUser(id, user) {
    const { name, username, email, password } = user;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await this.client`
      UPDATE users SET 
        name = ${name},
        username = ${username},
        email = ${email}, 
        password = ${hashedPassword},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async patchUser(id, updates) {
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }
    const fields = Object.keys(updates).map(
      (key) => this.client`${this.client(key)} = ${updates[key]}`
    );
    const result = await this.client`
      UPDATE users SET 
        ${this.client.join(fields, this.client`, `)},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteUser(id) {
    await this.client`
      DELETE FROM users WHERE id = ${id};
    `;
  }
}

export default new UserRepository();
