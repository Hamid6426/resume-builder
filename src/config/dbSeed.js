const connectDB = require('./dbConfig');

const seedDatabase = async () => {
  try {

    console.log("Seeding database...");
    const db = sql();

    // Insert initial users
    await db`
      INSERT INTO users (name, username, email, password)
      VALUES
        ('John Doe', 'johndoe', 'john.doe@example.com', 'password1'),
        ('Jane Smith', 'janesmith', 'jane.smith@example.com', 'password2'),
        ('Alice Johnson', 'alicej', 'alice.johnson@example.com', 'password3');
    `;

    // Insert initial resumes
    await db`
      INSERT INTO resumes (user_id, title, summary)
      VALUES
        ((SELECT id FROM users WHERE username = 'johndoe'), 'John Doe Resume', 'Experienced software engineer...'),
        ((SELECT id FROM users WHERE username = 'janesmith'), 'Jane Smith Resume', 'Skilled project manager...'),
        ((SELECT id FROM users WHERE username = 'alicej'), 'Alice Johnson Resume', 'Creative graphic designer...');
    `;

    // Insert initial sections
    await db`
      INSERT INTO sections (resume_id, type, order_index)
      VALUES
        ((SELECT id FROM resumes WHERE title = 'John Doe Resume'), 'Work Experience', 1),
        ((SELECT id FROM resumes WHERE title = 'Jane Smith Resume'), 'Education', 1),
        ((SELECT id FROM resumes WHERE title = 'Alice Johnson Resume'), 'Skills', 1);
    `;

    // Insert initial work experiences
    await db`
      INSERT INTO experiences (resume_id, company, position, start_date, end_date, description, order_index)
      VALUES
        ((SELECT id FROM resumes WHERE title = 'John Doe Resume'), 'Tech Corp', 'Software Engineer', '2020-01-01', '2023-01-01', 'Developed various applications...', 1),
        ((SELECT id FROM resumes WHERE title = 'Jane Smith Resume'), 'Business Inc', 'Project Manager', '2018-01-01', '2022-01-01', 'Managed several projects...', 1);
    `;

    // Insert initial education
    await db`
      INSERT INTO education (resume_id, school, degree, start_date, end_date, order_index)
      VALUES
        ((SELECT id FROM resumes WHERE title = 'Alice Johnson Resume'), 'Art University', 'BFA in Graphic Design', '2015-01-01', '2019-01-01', 1),
        ((SELECT id FROM resumes WHERE title = 'Jane Smith Resume'), 'Business School', 'MBA', '2014-01-01', '2016-01-01', 1);
    `;

    // Insert initial skills
    await db`
      INSERT INTO skills (resume_id, skill_name, proficiency, order_index)
      VALUES
        ((SELECT id FROM resumes WHERE title = 'John Doe Resume'), 'JavaScript', 'Advanced', 1),
        ((SELECT id FROM resumes WHERE title = 'Alice Johnson Resume'), 'Photoshop', 'Advanced', 1);
    `;

    // Insert initial projects
    await db`
      INSERT INTO projects (resume_id, title, description, link, order_index)
      VALUES
        ((SELECT id FROM resumes WHERE title = 'John Doe Resume'), 'Project Alpha', 'Developed a web application...', 'http://example.com/alpha', 1),
        ((SELECT id FROM resumes WHERE title = 'Alice Johnson Resume'), 'Design Portfolio', 'Showcase of design work...', 'http://example.com/portfolio', 1);
    `;

    // Insert initial activity logs
    await db`
      INSERT INTO activity_logs (user_id, action, details)
      VALUES
        ((SELECT id FROM users WHERE username = 'johndoe'), 'Login', 'User logged in'),
        ((SELECT id FROM users WHERE username = 'janesmith'), 'Profile Update', 'Updated profile information');
    `;

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// Execute seeding function
seedDatabase().catch((err) => console.error("Unexpected error:", err));
