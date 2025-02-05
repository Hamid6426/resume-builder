import sql from './db';

class EducationRepository {
  async createEducation(education) {
    const { resumeId, school, degree, startDate, endDate, orderIndex } = education;
    const result = await sql`
      INSERT INTO education (resume_id, school, degree, start_date, end_date, order_index)
      VALUES (${resumeId}, ${school}, ${degree}, ${startDate}, ${endDate}, ${orderIndex})
      RETURNING *;
    `;
    return result[0];
  }

  async getEducationById(id) {
    const result = await sql`
      SELECT * FROM education WHERE id = ${id};
    `;
    return result[0];
  }

  async getEducationsByResumeId(resumeId) {
    const result = await sql`
      SELECT * FROM education WHERE resume_id = ${resumeId};
    `;
    return result;
  }

  async updateEducation(id, education) {
    const { school, degree, startDate, endDate, orderIndex } = education;
    const result = await sql`
      UPDATE education SET school = ${school}, degree = ${degree}, start_date = ${startDate}, end_date = ${endDate}, order_index = ${orderIndex}, updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteEducation(id) {
    await sql`
      UPDATE education SET deleted_at = NOW() WHERE id = ${id};
    `;
  }
}

export default new EducationRepository();
