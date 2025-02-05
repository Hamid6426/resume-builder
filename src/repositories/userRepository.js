import sql from './db';

class UserRepository {

  async createUser(user) {
    const { name, username, email, password } = user;
    const result = await sql`
      INSERT INTO users (name, username, email, password)
      VALUES (${name}, ${username}, ${email}, ${password})
      RETURNING *;
    `;
    return result[0];
  }

  async getUserById(id) {
    const result = await sql`
      SELECT * FROM users WHERE id = ${id};
    `;
    return result[0];
  }

  async getUserByEmail(email) {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email};
    `;
    return result[0];
  }

  async getUserByUsername(username) {
    const result = await sql`
      SELECT * FROM users WHERE username = ${username};
    `;
    return result[0];
  }
  
  async updateUser(id, user) {
    const { name, username, email, password } = user;
    const result = await sql`
      UPDATE users SET 
        name = ${name},
        username = ${username},
        email = ${email}, 
        password = ${password},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async patchUser(id, updates) {
    const fields = Object.keys(updates).map(key => sql`${sql(key)} = ${updates[key]}`);
    const result = await sql`
      UPDATE users SET 
        ${sql.join(fields, sql`, `)},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteUser(id) {
    await sql`
      DELETE FROM users WHERE id = ${id};
    `;
  }
}

export default new UserRepository();
