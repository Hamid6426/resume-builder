const sql = require('../config/dbConfig');

class ResumeRepository {
  async createResume(resume) {
    const { userId, title, summary } = resume;
    const result = await this.client`
      INSERT INTO resumes (user_id, title, summary)
      VALUES (${userId}, ${title}, ${summary})
      RETURNING *;
    `;
    return result[0];
  }

  async getResumeById(id) {
    const result = await this.client`
      SELECT * FROM resumes WHERE id = ${id};
    `;
    return result[0];
  }

  async getResumesByUserId(userId) {
    const result = await this.client`
      SELECT * FROM resumes WHERE user_id = ${userId};
    `;
    return result;
  }

  async updateResume(id, resume) {
    const { title, summary } = resume;
    const result = await this.client`
      UPDATE resumes SET title = ${title}, summary = ${summary}, updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteResume(id) {
    await sql`
      UPDATE resumes SET deleted_at = NOW() WHERE id = ${id};
    `;
  }
}

export default new ResumeRepository();
