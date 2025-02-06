import connectDB from "@/config/dbConfig";

class EducationRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createEducation(education) {
    const { resume_id, school, degree, start_date, end_date, order_index } = education;
    const result = await this.client`
      INSERT INTO education (resume_id, school, degree, start_date, end_date, order_index)
      VALUES (${resume_id}, ${school}, ${degree}, ${start_date}, ${end_date}, ${order_index})
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

  async getEducationByResumeId(resume_id) {
    const result = await this.client`
      SELECT * FROM education WHERE resume_id = ${resume_id};
    `;
    return result;
  }

  async updateEducation(id, education) {
    const { school, degree, start_date, end_date, order_index } = education;
    const result = await this.client`
      UPDATE education SET 
        school = ${school},
        degree = ${degree},
        start_date = ${start_date},
        end_date = ${end_date},
        order_index = ${order_index},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
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
        updated_at = NOW() WHERE id = ${id} RETURNING *;
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
