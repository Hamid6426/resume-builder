const sql = require('../config/dbConfig');

class SkillRepository {
  async createSkill(skill) {
    const { resumeId, skillName, proficiency, orderIndex } = skill;
    const result = await this.client`
      INSERT INTO skills (resume_id, skill_name, proficiency, order_index)
      VALUES (${resumeId}, ${skillName}, ${proficiency}, ${orderIndex})
      RETURNING *;
    `;
    return result[0];
  }

  async getSkillById(id) {
    const result = await this.client`
      SELECT * FROM skills WHERE id = ${id};
    `;
    return result[0];
  }

  async getSkillsByResumeId(resumeId) {
    const result = await this.client`
      SELECT * FROM skills WHERE resume_id = ${resumeId};
    `;
    return result;
  }

  async updateSkill(id, skill) {
    const { skillName, proficiency, orderIndex } = skill;
    const result = await this.client`
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

export default new SkillRepository();
