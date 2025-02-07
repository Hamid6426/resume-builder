import connectDB from "./dbConfig";

const seedDatabase = async () => {
  try {

    console.log("Seeding database...");
    const db = connectDB();

    // Insert initial users
    await db`
      INSERT INTO users (name, userName, email, password)
      VALUES
        ('John Doe', 'johnDoe', 'john.doe@example.com', 'password1'),
        ('Jane Smith', 'janeSmith', 'jane.smith@example.com', 'password2'),
        ('Alice Johnson', 'aliceJ', 'alice.johnson@example.com', 'password3');
    `;

    // Insert initial resumes
    await db`
      INSERT INTO resumes (userId, title, summary)
      VALUES
        ((SELECT id FROM users WHERE userName = 'johnDoe'), 'John Doe Resume', 'Experienced software engineer...'),
        ((SELECT id FROM users WHERE userName = 'janeSmith'), 'Jane Smith Resume', 'Skilled project manager...'),
        ((SELECT id FROM users WHERE userName = 'aliceJ'), 'Alice Johnson Resume', 'Creative graphic designer...');
    `;

    // Insert initial sections
    await db`
      INSERT INTO sections (resumeId, type, orderIndex)
      VALUES
        ((SELECT id FROM resumes WHERE title = 'John Doe Resume'), 'Work Experience', 1),
        ((SELECT id FROM resumes WHERE title = 'Jane Smith Resume'), 'Education', 1),
        ((SELECT id FROM resumes WHERE title = 'Alice Johnson Resume'), 'Skills', 1);
    `;

    // Insert initial work experiences
    await db`
      INSERT INTO experiences (resumeId, company, position, startDate, endDate, description, orderIndex)
      VALUES
        ((SELECT id FROM resumes WHERE title = 'John Doe Resume'), 'Tech Corp', 'Software Engineer', '2020-01-01', '2023-01-01', 'Developed various applications...', 1),
        ((SELECT id FROM resumes WHERE title = 'Jane Smith Resume'), 'Business Inc', 'Project Manager', '2018-01-01', '2022-01-01', 'Managed several projects...', 1);
    `;

    // Insert initial education
    await db`
      INSERT INTO education (resumeId, school, degree, startDate, endDate, orderIndex)
      VALUES
        ((SELECT id FROM resumes WHERE title = 'Alice Johnson Resume'), 'Art University', 'BFA in Graphic Design', '2015-01-01', '2019-01-01', 1),
        ((SELECT id FROM resumes WHERE title = 'Jane Smith Resume'), 'Business School', 'MBA', '2014-01-01', '2016-01-01', 1);
    `;

    // Insert initial skills
    await db`
      INSERT INTO skills (resumeId, skillName, proficiency, orderIndex)
      VALUES
        ((SELECT id FROM resumes WHERE title = 'John Doe Resume'), 'JavaScript', 'Advanced', 1),
        ((SELECT id FROM resumes WHERE title = 'Alice Johnson Resume'), 'Photoshop', 'Advanced', 1);
    `;

    // Insert initial projects
    await db`
      INSERT INTO projects (resumeId, title, description, link, orderIndex)
      VALUES
        ((SELECT id FROM resumes WHERE title = 'John Doe Resume'), 'Project Alpha', 'Developed a web application...', 'http://example.com/alpha', 1),
        ((SELECT id FROM resumes WHERE title = 'Alice Johnson Resume'), 'Design Portfolio', 'Showcase of design work...', 'http://example.com/portfolio', 1);
    `;

    // Insert initial activity logs
    await db`
      INSERT INTO activityLogs (userId, action, details)
      VALUES
        ((SELECT id FROM users WHERE userName = 'johnDoe'), 'Login', 'User logged in'),
        ((SELECT id FROM users WHERE userName = 'janeSmith'), 'Profile Update', 'Updated profile information');
    `;

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// Execute seeding function
seedDatabase().catch((err) => console.error("Unexpected error:", err));
