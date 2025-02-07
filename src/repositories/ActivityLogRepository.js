import connectDB from "@/config/dbConfig";

class ActivityLogRepository {
  constructor() {
    this.client = connectDB(); // Neon serverless client
  }

  async createActivityLog(activityLog) {
    const { userid, action, details } = activityLog;
    const result = await this.client`
      INSERT INTO activitylogs (userid, action, details)
      VALUES (${userid}, ${action}, ${details})
      RETURNING *;
    `;
    return result[0];
  }

  async getActivityLogById(id) {
    const result = await this.client`
      SELECT * FROM activitylogs WHERE id = ${id};
    `;
    return result[0];
  }

  async getAllActivityLogs() {
    const result = await this.client`
      SELECT * FROM activitylogs;
    `;
    return result;
  }

  async getActivityLogsByUserId(userid) {
    const result = await this.client`
      SELECT * FROM activitylogs WHERE userid = ${userid};
    `;
    return result;
  }

  async updateActivityLog(id, activityLog) {
    const { action, details } = activityLog;
    const result = await this.client`
      UPDATE activitylogs SET 
        action = ${action},
        details = ${details},
        updatedate = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async patchActivityLog(id, updates) {
    const fields = Object.keys(updates).map(
      (key) => this.client`${this.client(key)} = ${updates[key]}`
    );
    const result = await this.client`
      UPDATE activitylogs SET 
        ${this.client.join(fields, this.client`, `)},
        updatedate = NOW() WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async deleteActivityLog(id) {
    await this.client`
      DELETE FROM activitylogs WHERE id = ${id};
    `;
  }
}

export default new ActivityLogRepository();
