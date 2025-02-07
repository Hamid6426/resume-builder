  import connectDB from "@/config/dbConfig";

  class ResumeRepository {
    constructor() {
      this.client = connectDB(); // Neon serverless client
    }

    // create resume for user_id (foriegn key is the user_id who owns the resume)
    async createResume(resume) {
      const { user_id: user_id, title, summary } = resume;
      const currentResumes = await this.client`
        SELECT COUNT(*) FROM resumes WHERE user_id = ${user_id} AND deleted_at IS NULL;
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

    // GET all resumes by user_id
    async getAllResumesByUserId(user_id) {
      const result = await this.client`
          SELECT * FROM resumes WHERE user_id = ${user_id};
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

    // GET Resume by username
    // async getResumesByUsername(username) {
    //   const result = await this.client`
    //     SELECT resumes.*
    //     FROM resumes
    //     INNER JOIN users ON resumes.user_id = users.id
    //     WHERE users.username = ${username};
    //   `;
    //   return result;
    // }

    // GET Resume by id
    async getResumeById(id) {
      const result = await this.client`
          SELECT * FROM resumes WHERE id = ${id};
        `;
      return result[0];
    }

    // UPDATE resume by id
    async updateResumeById(id, resume) {
      const { title, summary } = resume;
      const result = await this.client`
        UPDATE resumes SET 
          title = ${title},
          summary = ${summary},
          updated_at = NOW() WHERE id = ${id} RETURNING *;
      `;
      return result[0];
    }

    // PATCH resume by id
    async patchResumeById(id, updates) {
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

    // DELETE resume by id
    async deleteResumeById(id) {
      // Soft delete: Update the deleted_at field instead of hard deleting
      const result = await this.client`
        UPDATE resumes SET 
          deleted_at = NOW() WHERE id = ${id} RETURNING *;
      `;
      return result[0];
    }
  }

  export default new ResumeRepository();
