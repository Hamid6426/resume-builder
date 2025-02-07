import connectDB from "@/config/dbConfig";
import bcrypt from "bcrypt";

class UserRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  // User has these fields: { name, username, email, password }
  // When input: { name, username, email, password } (NO CAMEL CASES HERE)

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

  async loginAdmin(email) {
    const result = await this.client`
      SELECT user_id, password FROM admin WHERE email = ${email} LIMIT 1;
    `;
    return result[0] || null;
  }

  async getAllUsers() {
    const result = await this.client`
      SELECT * FROM users;
    `;
    return result;
  }

  async getUserById(user_id) {
    const result = await this.client`
      SELECT * FROM users WHERE user_id = ${user_id};
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

  async updateUser(user_id, user) {
    const { name, username, email, password } = user;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await this.client`
      UPDATE users SET 
        name = ${name},
        username = ${username},
        email = ${email}, 
        password = ${hashedPassword},
        updatedate = NOW() WHERE user_id = ${user_id} RETURNING *;
    `;
    return result[0];
  }

  async patchUser(user_id, updates) {
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
        updatedate = NOW() WHERE user_id = ${user_id} RETURNING *;
    `;
    return result[0];
  }

  async deleteUser(user_id) {
    await this.client`
      DELETE FROM users WHERE user_id = ${user_id};
    `;
  }
}

export default new UserRepository();
