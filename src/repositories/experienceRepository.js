import connectDB from "@/config/dbConfig";

class ExperienceRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createExperience(experience) {
    const { resumeid, company, position, startdate, enddate, description, orderindex } = experience;
    const result = await this.client`
      INSERT INTO experiences (resumeid, company, position, startdate, enddate, description, orderindex)
      VALUES (${resumeid}, ${company}, ${position}, ${startdate}, ${enddate}, ${description}, ${orderindex})
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

  async getExperiencesByResumeId(resumeid) {
    const result = await this.client`
      SELECT * FROM experiences WHERE resumeid = ${resumeid};
    `;
    return result;
  }

  async updateExperience(id, experience) {
    const { company, position, startdate, enddate, description, orderindex } = experience;
    const result = await this.client`
      UPDATE experiences SET 
        company = ${company},
        position = ${position},
        startdate = ${startdate},
        enddate = ${enddate},
        description = ${description},
        orderindex = ${orderindex},
        updatedate = NOW() WHERE id = ${id} RETURNING *;
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
        updatedate = NOW() WHERE id = ${id} RETURNING *;
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
