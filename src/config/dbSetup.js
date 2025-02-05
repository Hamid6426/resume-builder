import sql from './db';

const createTables = async () => {
  try {
    console.log("Setting up database...");

    // tx = transaction-based queries for better performance
    await sql.begin(async (tx) => {
      // Users Table
      await tx`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now()
        );
       CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      `;

      // Resumes Table
      await tx`
        CREATE TABLE IF NOT EXISTS resumes (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          title TEXT NOT NULL,
          summary TEXT,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now(),
          deleted_at TIMESTAMP NULL
        );
      -- Add an index on user_id for faster queries
      CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
    `;

      // Resume Sections Table
      await tx`
        CREATE TABLE IF NOT EXISTS sections (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
          type TEXT NOT NULL,
          order_index INT NOT NULL,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now(),
          deleted_at TIMESTAMP NULL
        );
      `;

      // Work Experience Table
      await tx`
        CREATE TABLE IF NOT EXISTS experiences (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
          company TEXT NOT NULL,
          position TEXT NOT NULL,
          start_date DATE NOT NULL,
          end_date DATE,
          description TEXT,
          order_index INT NOT NULL,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now(),
          deleted_at TIMESTAMP NULL
        );
        CREATE INDEX IF NOT EXISTS idx_experiences_resume_id ON experiences(resume_id);
      `;

      // Education Table
      await tx`
        CREATE TABLE IF NOT EXISTS education (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
          school TEXT NOT NULL,
          degree TEXT NOT NULL,
          start_date DATE NOT NULL,
          end_date DATE,
          order_index INT NOT NULL,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now(),
          deleted_at TIMESTAMP NULL
        );
        CREATE INDEX IF NOT EXISTS idx_education_resume_id ON education(resume_id);
      `;

      // Skills Table
      await tx`
        CREATE TABLE IF NOT EXISTS skills (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
          skill_name TEXT NOT NULL,
          proficiency TEXT CHECK (proficiency IN ('Beginner', 'Intermediate', 'Advanced')) NOT NULL,
          order_index INT NOT NULL,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now(),
          deleted_at TIMESTAMP NULL
        );
        CREATE INDEX IF NOT EXISTS idx_skills_resume_id ON skills(resume_id);
      `;

      // Projects Table
      await tx`
        CREATE TABLE IF NOT EXISTS projects (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
          title TEXT NOT NULL,
          description TEXT,
          link TEXT,
          order_index INT NOT NULL,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now(),
          deleted_at TIMESTAMP NULL
        );
        CREATE INDEX IF NOT EXISTS idx_projects_resume_id ON projects(resume_id);
      `;

      // Activity Log Table
      await tx`
        CREATE TABLE IF NOT EXISTS activity_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        action TEXT NOT NULL,
        details TEXT,
        created_at TIMESTAMP DEFAULT now()
      );
    `;

    });

    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};

// Execute function
createTables().catch((err) => console.error("❌ Unexpected error:", err));