import sql from './db';

class SectionRepository {
  async createSection(section) {
    const { resumeId, type, orderIndex } = section;
    const result = await sql`
      INSERT INTO sections (resume_id, type, order_index)
      VALUES (${resumeId}, ${type}, ${orderIndex})
      RETURNING *;
    `;
    return result[0];
  }

  async getSectionById(id) {
    const result = await sql`
      SELECT * FROM sections WHERE id = ${id};
    `;
    return result[0];
  }

  async getSectionsByResumeId(resumeId) {
    const result = await sql`
      SELECT * FROM sections WHERE resume_id = ${resumeId};
    `;
    return result;
  }

  async updateSection(id, section) {
    const { type, orderIndex } = section;
    const result = await sql`
      UPDATE sections SET type = ${type}, order_index = ${orderIndex}, updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteSection(id) {
    await sql`
      UPDATE sections SET deleted_at = NOW() WHERE id = ${id};
    `;
  }
}

export default new SectionRepository();
