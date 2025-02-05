import sql from './db';
import { v4 as uuidv4 } from 'uuid'; // Generate UUIDs

const seedDatabase = async () => {
  try {
    console.log("🌱 Seeding database with dummy data...");

    await sql.begin(async (tx) => {
      // Create Users
      const user1 = uuidv4();
      const user2 = uuidv4();

      await tx`
        INSERT INTO users (id, name, username, email, password) VALUES
        (${user1}, 'John Doe', 'johndoe123', 'john@example.com', 'hashedpassword1'),
        (${user2}, 'Jane Smith', 'jane.123', 'jane@example.com', 'hashedpassword2')
        ON CONFLICT (email) DO NOTHING;
        ON CONFLICT (username) DO NOTHING;
      `;

      // Create Resumes
      const resume1 = uuidv4();
      const resume2 = uuidv4();

      await tx`
        INSERT INTO resumes (id, user_id, title, summary) VALUES
        (${resume1}, ${user1}, 'Software Engineer Resume', 'Experienced in full-stack development'),
        (${resume2}, ${user2}, 'Data Scientist Resume', 'Expert in machine learning and analytics')
        ON CONFLICT (id) DO NOTHING;
      `;

      // Add Experience
      await tx`
        INSERT INTO experiences (id, resume_id, company, position, start_date, end_date, description, order_index) VALUES
        (${uuidv4()}, ${resume1}, 'TechCorp', 'Frontend Developer', '2020-01-01', '2022-06-01', 'Developed React apps', 1),
        (${uuidv4()}, ${resume1}, 'DevStudio', 'Backend Developer', '2022-07-01', NULL, 'Built scalable APIs', 2),
        (${uuidv4()}, ${resume2}, 'AI Labs', 'Data Scientist', '2019-05-01', '2021-12-31', 'Analyzed datasets', 1)
        ON CONFLICT (id) DO NOTHING;
      `;

      // Add Education
      await tx`
        INSERT INTO education (id, resume_id, school, degree, start_date, end_date, order_index) VALUES
        (${uuidv4()}, ${resume1}, 'MIT', 'BSc Computer Science', '2016-09-01', '2020-06-01', 1),
        (${uuidv4()}, ${resume2}, 'Stanford', 'MSc Data Science', '2017-09-01', '2019-06-01', 1)
        ON CONFLICT (id) DO NOTHING;
      `;

      // Add Skills
      await tx`
        INSERT INTO skills (id, resume_id, skill_name, proficiency, order_index) VALUES
        (${uuidv4()}, ${resume1}, 'JavaScript', 'Advanced', 1),
        (${uuidv4()}, ${resume1}, 'React', 'Advanced', 2),
        (${uuidv4()}, ${resume2}, 'Python', 'Advanced', 1),
        (${uuidv4()}, ${resume2}, 'Machine Learning', 'Intermediate', 2)
        ON CONFLICT (id) DO NOTHING;
      `;

      // Add Projects
      await tx`
        INSERT INTO projects (id, resume_id, title, description, link, order_index) VALUES
        (${uuidv4()}, ${resume1}, 'Portfolio Website', 'Built a personal portfolio', 'https://portfolio.com', 1),
        (${uuidv4()}, ${resume2}, 'ML Model', 'Developed predictive models', 'https://github.com/ml-model', 1)
        ON CONFLICT (id) DO NOTHING;
      `;
    });

    console.log("Dummy data inserted successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// Execute function
seedDatabase().catch((err) => console.error("❌ Unexpected error:", err));
