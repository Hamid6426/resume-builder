import connectDB from "@/config/dbConfig";

class EducationRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createEducation(education) {
    const { resumeid, school, degree, startdate, enddate, orderindex } = education;
    const result = await this.client`
      INSERT INTO education (resumeid, school, degree, startdate, enddate, orderindex)
      VALUES (${resumeid}, ${school}, ${degree}, ${startdate}, ${enddate}, ${orderindex})
      RETURNING *;
    `;
    return result[0];
  }

  async getEducationById(id) {
    const result = await this.client`
      SELECT * FROM education WHERE id = ${id};
    `;
    return result[0];
  }

  async getAllEducation() {
    const result = await this.client`
      SELECT * FROM education;
    `;
    return result;
  }

  async getEducationByResumeId(resumeid) {
    const result = await this.client`
      SELECT * FROM education WHERE resumeid = ${resumeid};
    `;
    return result;
  }

  async updateEducation(id, education) {
    const { school, degree, startdate, enddate, orderindex } = education;
    const result = await this.client`
      UPDATE education SET 
        school = ${school},
        degree = ${degree},
        startdate = ${startdate},
        enddate = ${enddate},
        orderindex = ${orderindex},
        updatedate = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async patchEducation(id, updates) {
    const fields = Object.keys(updates).map(
      (key) => this.client`${this.client(key)} = ${updates[key]}`
    );
    const result = await this.client`
      UPDATE education SET 
        ${this.client.join(fields, this.client`, `)},
        updatedate = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteEducation(id) {
    await this.client`
      DELETE FROM education WHERE id = ${id};
    `;
  }
}

export default new EducationRepository();
