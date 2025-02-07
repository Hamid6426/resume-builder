import connectDB from "@/config/dbConfig";

class ResumeRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  // Create resume for user_id (foreign key is the user_id who owns the resume)
  async createResume(resume) {
    const { user_id, title, summary } = resume;
    const currentResumes = await this.client`
      SELECT COUNT(*) FROM resumes WHERE user_id = ${user_id} AND deletedate IS NULL;
    `;
    if (currentResumes[0].count >= 5) {
      throw new Error("User has reached the limit of 5 resumes.");
    }
    const result = await this.client`
      INSERT INTO resumes (user_id, title, summary)
      VALUES (${user_id}, ${title}, ${summary})
      RETURNING *;
    `;
    return result[0];
  }

  async getAllResumesByUserId(user_id) {
    const result = await this.client`
      SELECT * FROM resumes WHERE user_id = ${user_id} AND deletedate IS NULL;
    `;
    return result;
  }

  // GET all resumes (FOR ADMINS ONLY)
  async getAllResumes() {
    const result = await this.client`
      SELECT * FROM resumes;
    `;
    return result;
  }

  // GET resume by username
  async getResumesByUsername(username) {
    const result = await this.client`
      SELECT resumes.*
      FROM resumes
      INNER JOIN users ON resumes.user_id = users.user_id
      WHERE users.username = ${username};
    `;
    return result;
  }

  // GET resume by resume_id
  async getResumeById(resume_id) {
    const result = await this.client`
      SELECT * FROM resumes WHERE resume_id = ${resume_id};
    `;
    return result[0];
  }

  // UPDATE resume by resume_id
  async updateResumeById(resume_id, resume) {
    const { title, summary } = resume;
    const result = await this.client`
      UPDATE resumes SET 
        title = ${title},
        summary = ${summary},
        updatedate = NOW() WHERE resume_id = ${resume_id} RETURNING *;
    `;
    return result[0];
  }

  // PATCH resume by resume_id
  async patchResumeById(resume_id, updates) {
    const fields = Object.keys(updates).map(
      (key) => this.client`${this.client(key)} = ${updates[key]}`
    );
    const result = await this.client`
      UPDATE resumes SET 
        ${this.client.join(fields, this.client`, `)},
        updatedate = NOW() WHERE resume_id = ${resume_id} RETURNING *;
    `;
    return result[0];
  }

  // DELETE resume by resume_id
  async deleteResumeById(resume_id) {
    // Soft delete: Update the deletedate field instead of hard deleting
    const result = await this.client`
      UPDATE resumes SET 
        deletedate = NOW() WHERE resume_id = ${resume_id} RETURNING *;
    `;
    return result[0];
  }
}

export default new ResumeRepository();
