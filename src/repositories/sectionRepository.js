import connectDB from "@/config/dbConfig";

class SectionRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createSection(section) {
    const { resume_id, type, order_index } = section;
    const result = await this.client`
      INSERT INTO sections (resume_id, type, order_index)
      VALUES (${resume_id}, ${type}, ${order_index})
      RETURNING *;
    `;
    return result[0];
  }

  async getSectionById(id) {
    const result = await this.client`
      SELECT * FROM sections WHERE id = ${id};
    `;
    return result[0];
  }

  async getAllSections() {
    const result = await this.client`
      SELECT * FROM sections;
    `;
    return result;
  }

  async getSectionsByResumeId(resume_id) {
    const result = await this.client`
      SELECT * FROM sections WHERE resume_id = ${resume_id};
    `;
    return result;
  }

  async updateSection(id, section) {
    const { type, order_index } = section;
    const result = await this.client`
      UPDATE sections SET 
        type = ${type},
        order_index = ${order_index},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async patchSection(id, updates) {
    const fields = Object.keys(updates).map(
      (key) => this.client`${this.client(key)} = ${updates[key]}`
    );
    const result = await this.client`
      UPDATE sections SET 
        ${this.client.join(fields, this.client`, `)},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteSection(id) {
    await this.client`
      DELETE FROM sections WHERE id = ${id};
    `;
  }
}

export default new SectionRepository();
