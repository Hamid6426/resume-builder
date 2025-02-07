import connectDB from "@/config/dbConfig";

class SectionRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createSection(section) {
    const { resumeid, type, orderindex } = section;
    const result = await this.client`
      INSERT INTO sections (resumeid, type, orderindex)
      VALUES (${resumeid}, ${type}, ${orderindex})
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

  async getSectionsByResumeId(resumeid) {
    const result = await this.client`
      SELECT * FROM sections WHERE resumeid = ${resumeid};
    `;
    return result;
  }

  async updateSection(id, section) {
    const { type, orderindex } = section;
    const result = await this.client`
      UPDATE sections SET 
        type = ${type},
        orderindex = ${orderindex},
        updatedate = NOW() WHERE id = ${id} RETURNING *;
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
        updatedate = NOW() WHERE id = ${id} RETURNING *;
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
