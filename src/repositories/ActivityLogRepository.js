import connectDB from "@/config/dbConfig";

class ActivityLogRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createActivityLog(activityLog) {
    const { user_id, action, details } = activityLog;
    const result = await this.client`
      INSERT INTO activity_logs (user_id, action, details)
      VALUES (${user_id}, ${action}, ${details})
      RETURNING *;
    `;
    return result[0];
  }

  async getActivityLogById(id) {
    const result = await this.client`
      SELECT * FROM activity_logs WHERE id = ${id};
    `;
    return result[0];
  }

  async getAllActivityLogs() {
    const result = await this.client`
      SELECT * FROM activity_logs;
    `;
    return result;
  }

  async getActivityLogsByUserId(user_id) {
    const result = await this.client`
      SELECT * FROM activity_logs WHERE user_id = ${user_id};
    `;
    return result;
  }

  async updateActivityLog(id, activityLog) {
    const { action, details } = activityLog;
    const result = await this.client`
      UPDATE activity_logs SET 
        action = ${action},
        details = ${details},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async patchActivityLog(id, updates) {
    const fields = Object.keys(updates).map(
      (key) => this.client`${this.client(key)} = ${updates[key]}`
    );
    const result = await this.client`
      UPDATE activity_logs SET 
        ${this.client.join(fields, this.client`, `)},
        updated_at = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteActivityLog(id) {
    await this.client`
      DELETE FROM activity_logs WHERE id = ${id};
    `;
  }
}

export default new ActivityLogRepository();
