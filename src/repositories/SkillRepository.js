import connectDB from "@/config/dbConfig";

class SkillRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createSkill(skill) {
    const { resume_id, skill_name, proficiency, order_index } = skill;
    const result = await this.client`
      INSERT INTO skills (resume_id, skill_name, proficiency, order_index)
      VALUES (${resume_id}, ${skill_name}, ${proficiency}, ${order_index})
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

  async getAllSkills() {
    const result = await this.client`
      SELECT * FROM skills;
    `;
    return result;
  }

  async getSkillsByResumeId(resume_id) {
    const result = await this.client`
      SELECT * FROM skills WHERE resume_id = ${resume_id};
    `;
    return result;
  }

  async updateSkill(id, skill) {
    const { skill_name, proficiency, order_index } = skill;
    const result = await this.client`
      UPDATE skills SET 
        skill_name = ${skill_name},
        proficiency = ${proficiency},
        order_index = ${order_index},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async patchSkill(id, updates) {
    const fields = Object.keys(updates).map(
      (key) => this.client`${this.client(key)} = ${updates[key]}`
    );
    const result = await this.client`
      UPDATE skills SET 
        ${this.client.join(fields, this.client`, `)},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteSkill(id) {
    await this.client`
      DELETE FROM skills WHERE id = ${id};
    `;
  }
}

export default new SkillRepository();
