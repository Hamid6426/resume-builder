import sql from './db';

class SkillsRepository {
  async createSkill(skill) {
    const { resumeId, skillName, proficiency, orderIndex } = skill;
    const result = await sql`
      INSERT INTO skills (resume_id, skill_name, proficiency, order_index)
      VALUES (${resumeId}, ${skillName}, ${proficiency}, ${orderIndex})
      RETURNING *;
    `;
    return result[0];
  }

  async getSkillById(id) {
    const result = await sql`
      SELECT * FROM skills WHERE id = ${id};
    `;
    return result[0];
  }

  async getSkillsByResumeId(resumeId) {
    const result = await sql`
      SELECT * FROM skills WHERE resume_id = ${resumeId};
    `;
    return result;
  }

  async updateSkill(id, skill) {
    const { skillName, proficiency, orderIndex } = skill;
    const result = await sql`
      UPDATE skills SET skill_name = ${skillName}, proficiency = ${proficiency}, order_index = ${orderIndex}, updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteSkill(id) {
    await sql`
      UPDATE skills SET deleted_at = NOW() WHERE id = ${id};
    `;
  }
}

export default new SkillsRepository();
