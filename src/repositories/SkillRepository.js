import connectDB from "@/config/dbConfig";

class SkillRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createSkill(skill) {
    const { resumeid, skillname, proficiency, orderindex } = skill;
    const result = await this.client`
      INSERT INTO skills (resumeid, skillname, proficiency, orderindex)
      VALUES (${resumeid}, ${skillname}, ${proficiency}, ${orderindex})
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

  async getSkillsByResumeId(resumeid) {
    const result = await this.client`
      SELECT * FROM skills WHERE resumeid = ${resumeid};
    `;
    return result;
  }

  async updateSkill(id, skill) {
    const { skillname, proficiency, orderindex } = skill;
    const result = await this.client`
      UPDATE skills SET 
        skillname = ${skillname},
        proficiency = ${proficiency},
        orderindex = ${orderindex},
        updatedate = NOW() WHERE id = ${id} RETURNING *;
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
        updatedate = NOW() WHERE id = ${id} RETURNING *;
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
