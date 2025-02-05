import sql from './db';

class ExperienceRepository {
  
  async createExperience(experience) {
    const { resumeId, company, position, startDate, endDate, description, orderIndex } = experience;
    const result = await sql`
      INSERT INTO experiences (resume_id, company, position, start_date, end_date, description, order_index)
      VALUES (${resumeId}, ${company}, ${position}, ${startDate}, ${endDate}, ${description}, ${orderIndex})
      RETURNING *;
    `;
    return result[0];
  }

  async getExperienceById(id) {
    const result = await sql`
      SELECT * FROM experiences WHERE id = ${id};
    `;
    return result[0];
  }

  async getExperiencesByResumeId(resumeId) {
    const result = await sql`
      SELECT * FROM experiences WHERE resume_id = ${resumeId};
    `;
    return result;
  }

  async updateExperience(id, experience) {
    const { company, position, startDate, endDate, description, orderIndex } = experience;
    const result = await sql`
      UPDATE experiences SET company = ${company}, position = ${position}, start_date = ${startDate}, end_date = ${endDate}, description = ${description}, order_index = ${orderIndex}, updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteExperience(id) {
    await sql`
      UPDATE experiences SET deleted_at = NOW() WHERE id = ${id};
    `;
  }
}

export default new ExperienceRepository();
