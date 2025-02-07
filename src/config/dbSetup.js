import connectDB from "./dbConfig";

const createTables = async () => {
  try {
    const db = connectDB();

    // Users Table
    await db`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        userName TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT now(),
        updatedAt TIMESTAMP DEFAULT now()
      );
    `;
    await db`
      CREATE INDEX IF NOT EXISTS idxUsersEmail ON users(email);
    `;

    // Resumes Table
    await db`
      CREATE TABLE IF NOT EXISTS resumes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        summary TEXT,
        createdAt TIMESTAMP DEFAULT now(),
        updatedAt TIMESTAMP DEFAULT now(),
        deletedAt TIMESTAMP NULL
      );
    `;
    await db`
      CREATE INDEX IF NOT EXISTS idxResumesUserId ON resumes(userId);
    `;

    // Resume Sections Table
    await db`
      CREATE TABLE IF NOT EXISTS sections (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        resumeId UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        orderIndex INT NOT NULL,
        createdAt TIMESTAMP DEFAULT now(),
        updatedAt TIMESTAMP DEFAULT now(),
        deletedAt TIMESTAMP NULL
      );
    `;

    // Work Experience Table
    await db`
      CREATE TABLE IF NOT EXISTS experiences (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        resumeId UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
        company TEXT NOT NULL,
        position TEXT NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE,
        description TEXT,
        orderIndex INT NOT NULL,
        createdAt TIMESTAMP DEFAULT now(),
        updatedAt TIMESTAMP DEFAULT now(),
        deletedAt TIMESTAMP NULL
      );
    `;
    await db`
      CREATE INDEX IF NOT EXISTS idxExperiencesResumeId ON experiences(resumeId);
    `;

    // Education Table
    await db`
      CREATE TABLE IF NOT EXISTS education (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        resumeId UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
        school TEXT NOT NULL,
        degree TEXT NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE,
        orderIndex INT NOT NULL,
        createdAt TIMESTAMP DEFAULT now(),
        updatedAt TIMESTAMP DEFAULT now(),
        deletedAt TIMESTAMP NULL
      );
    `;
    await db`
      CREATE INDEX IF NOT EXISTS idxEducationResumeId ON education(resumeId);
    `;

    // Skills Table
    await db`
      CREATE TABLE IF NOT EXISTS skills (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        resumeId UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
        skillName TEXT NOT NULL,
        proficiency TEXT CHECK (proficiency IN ('Beginner', 'Intermediate', 'Advanced')) NOT NULL,
        orderIndex INT NOT NULL,
        createdAt TIMESTAMP DEFAULT now(),
        updatedAt TIMESTAMP DEFAULT now(),
        deletedAt TIMESTAMP NULL
      );
    `;
    await db`
      CREATE INDEX IF NOT EXISTS idxSkillsResumeId ON skills(resumeId);
    `;

    // Projects Table
    await db`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        resumeId UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        link TEXT,
        orderIndex INT NOT NULL,
        createdAt TIMESTAMP DEFAULT now(),
        updatedAt TIMESTAMP DEFAULT now(),
        deletedAt TIMESTAMP NULL
      );
    `;
    await db`
      CREATE INDEX IF NOT EXISTS idxProjectsResumeId ON projects(resumeId);
    `;

    // Activity Log Table
    await db`
      CREATE TABLE IF NOT EXISTS activityLogs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        action TEXT NOT NULL,
        details TEXT,
        createdAt TIMESTAMP DEFAULT now()
      );
    `;

    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};

createTables().catch((err) => console.error("Unexpected error:", err));
