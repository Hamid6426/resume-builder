import connectDB from "@/config/dbConfig";

class ExperienceRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createExperience(experience) {
    const { resume_id, company, position, start_date, end_date, description, order_index } = experience;
    const result = await this.client`
      INSERT INTO experiences (resume_id, company, position, start_date, end_date, description, order_index)
      VALUES (${resume_id}, ${company}, ${position}, ${start_date}, ${end_date}, ${description}, ${order_index})
      RETURNING *;
    `;
    return result[0];
  }

  async getExperienceById(id) {
    const result = await this.client`
      SELECT * FROM experiences WHERE id = ${id};
    `;
    return result[0];
  }

  async getAllExperiences() {
    const result = await this.client`
      SELECT * FROM experiences;
    `;
    return result;
  }

  async getExperiencesByResumeId(resume_id) {
    const result = await this.client`
      SELECT * FROM experiences WHERE resume_id = ${resume_id};
    `;
    return result;
  }

  async updateExperience(id, experience) {
    const { company, position, start_date, end_date, description, order_index } = experience;
    const result = await this.client`
      UPDATE experiences SET 
        company = ${company},
        position = ${position},
        start_date = ${start_date},
        end_date = ${end_date},
        description = ${description},
        order_index = ${order_index},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async patchExperience(id, updates) {
    const fields = Object.keys(updates).map(
      (key) => this.client`${this.client(key)} = ${updates[key]}`
    );
    const result = await this.client`
      UPDATE experiences SET 
        ${this.client.join(fields, this.client`, `)},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteExperience(id) {
    await this.client`
      DELETE FROM experiences WHERE id = ${id};
    `;
  }
}

export default new ExperienceRepository();
