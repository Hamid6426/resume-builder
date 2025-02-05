const sql = require('../config/dbConfig');

class ProjectRepository {

  async createProject(project) {
    const { resumeId, title, description, link, orderIndex } = project;
    const result = await this.client`
      INSERT INTO projects (resume_id, title, description, link, order_index, created_at, updated_at)
      VALUES (${resumeId}, ${title}, ${description}, ${link}, ${orderIndex}, NOW(), NOW())
      RETURNING *;
    `;
    return result[0];
  }

  async getProjectById(id) {
    const result = await this.client`
      SELECT * FROM projects WHERE id = ${id} AND deleted_at IS NULL;
    `;
    return result[0];
  }

  async getProjectsByResumeId(resumeId) {
    const result = await this.client`
      SELECT * FROM projects WHERE resume_id = ${resumeId} AND deleted_at IS NULL ORDER BY order_index;
    `;
    return result;
  }

  async updateProject(id, project) {
    const { title, description, link, orderIndex } = project;
    const result = await this.client`
      UPDATE projects SET title = ${title}, description = ${description}, link = ${link}, order_index = ${orderIndex}, updated_at = NOW() WHERE id = ${id} AND deleted_at IS NULL RETURNING *;
    `;
    return result[0];
  }

  async deleteProject(id) {
    await sql`
      UPDATE projects SET deleted_at = NOW() WHERE id = ${id};
    `;
  }
}

export default new ProjectRepository();
