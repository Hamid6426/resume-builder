import connectDB from "@/config/dbConfig";

class ResumeRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createResume(resume) {
    const { user_id, title, summary } = resume;
    const result = await this.client`
      INSERT INTO resumes (user_id, title, summary)
      VALUES (${user_id}, ${title}, ${summary})
      RETURNING *;
    `;
    return result[0];
  }

  async getAllResumes() {
    const result = await this.client`
      SELECT * FROM resumes;
    `;
    return result;
  }

  async getResumeById(id) {
    const result = await this.client`
      SELECT * FROM resumes WHERE id = ${id};
    `;
    return result[0];
  }
  
  async getAllResumesByUserId(user_id) {
    const result = await this.client`
      SELECT * FROM resumes WHERE user_id = ${user_id};
    `;
    return result;
  }

  async getResumesByUsername(username) {
    const result = await this.client`
      SELECT resumes.*
      FROM resumes
      INNER JOIN users ON resumes.user_id = users.id
      WHERE users.username = ${username};
    `;
    return result;
  }

  async updateResume(id, resume) {
    const { title, summary } = resume;
    const result = await this.client`
      UPDATE resumes SET 
        title = ${title},
        summary = ${summary},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async patchResume(id, updates) {
    const fields = Object.keys(updates).map(
      (key) => this.client`${this.client(key)} = ${updates[key]}`
    );
    const result = await this.client`
      UPDATE resumes SET 
        ${this.client.join(fields, this.client`, `)},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteResume(id) {
    // Soft delete: Update the deleted_at field instead of hard deleting
    const result = await this.client`
      UPDATE resumes SET 
        deleted_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }
}

export default new ResumeRepository();
