import connectDB from "@/config/dbConfig";

class ProjectRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createProject(project) {
    const { resume_id, title, description, link, order_index } = project;
    const result = await this.client`
      INSERT INTO projects (resume_id, title, description, link, order_index)
      VALUES (${resume_id}, ${title}, ${description}, ${link}, ${order_index})
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

  async getProjectsByResumeId(resume_id) {
    const result = await this.client`
      SELECT * FROM projects WHERE resume_id = ${resume_id};
    `;
    return result;
  }

  async updateProject(id, project) {
    const { title, description, link, order_index } = project;
    const result = await this.client`
      UPDATE projects SET 
        title = ${title},
        description = ${description},
        link = ${link},
        order_index = ${order_index},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
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
        updated_at = NOW() WHERE id = ${id} RETURNING *;
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
