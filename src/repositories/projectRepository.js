import connectDB from "@/config/dbConfig";

class ProjectRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createProject(project) {
    const { resumeid, title, description, link, orderindex } = project;
    const result = await this.client`
      INSERT INTO projects (resumeid, title, description, link, orderindex)
      VALUES (${resumeid}, ${title}, ${description}, ${link}, ${orderindex})
      RETURNING *;
    `;
    return result[0];
  }

  async getProjectById(id) {
    const result = await this.client`
      SELECT * FROM projects WHERE id = ${id};
    `;
    return result[0];
  }

  async getAllProjects() {
    const result = await this.client`
      SELECT * FROM projects;
    `;
    return result;
  }

  async getProjectsByResumeId(resumeid) {
    const result = await this.client`
      SELECT * FROM projects WHERE resumeid = ${resumeid};
    `;
    return result;
  }

  async updateProject(id, project) {
    const { title, description, link, orderindex } = project;
    const result = await this.client`
      UPDATE projects SET 
        title = ${title},
        description = ${description},
        link = ${link},
        orderindex = ${orderindex},
        updatedate = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async patchProject(id, updates) {
    const fields = Object.keys(updates).map(
      (key) => this.client`${this.client(key)} = ${updates[key]}`
    );
    const result = await this.client`
      UPDATE projects SET 
        ${this.client.join(fields, this.client`, `)},
        updatedate = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteProject(id) {
    await this.client`
      DELETE FROM projects WHERE id = ${id};
    `;
  }
}

export default new ProjectRepository();
