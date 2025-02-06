# Resume Builder Web App

A fast and intuitive web application built with **Next.js** to create and download professional resumes.

## Features

- **Live Preview**: See changes in real-time as you edit your resume.
- **Customizable Templates**: Choose from multiple design templates.
- **Download as PDF**: Export resumes in PDF format.
- **User Authentication**: Securely save and access resumes (optional).
- **Dark Mode**: User-friendly light/dark mode support.
- **Resume Sharing**: Share your resume as link.


## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Axiox
- **Backend**: Node.js, JWT, cors
- **Database**: MongoDB, Neon(serverless)
- **PDF Generation**: React-to-PDF / jsPDF

## Installation

1. Clone the repository:

```
git clone https://github.com/hamid6426/resume-builder.git
cd resume-builder
```

2. Install dependencies:

```
npm install  # or yarn install
```

3. Run the development server:

```
npm run dev  # or yarn dev
```

4. Open http://localhost:3000 in your browser.

## Configuration
Create a .env.local file and add required environment variables:

```
NEXT_PUBLIC_API_KEY=your-api-key
DATABASE_URL=your-database-url
```

## Deployment

### Vercel:
```
vercel
```

### Docker:
```
docker build -t resume-builder .
docker run -p 3000:3000 resume-builder
```

## Contributing
- Fork the project.
- Create a new branch
```
git checkout -b feature-branch
```
- Commit changes
```
git commit -m "Added new feature"
```
- Push to the branch 
```
git push origin feature-branch
```
- Open a pull request.

## License
This project is open-source and available under the MIT License.

## Additional

# Creating a .txt file with the folder structure

```
resume-builder/
│── public/                   # Static assets (favicons, images, etc.)
│── src/
│   ├── pages/                # Next.js Page Router
│   │   ├── index.js          # Home page
│   │   ├── dashboard.js      # User dashboard
│   │   ├── resume/           # Resume-related pages
│   │   │   ├── create.js     # Resume builder page
│   │   │   ├── [id].js       # Dynamic route for viewing resumes
│   │   ├── api/              # API routes (serverless functions)
│   │   │   ├── saveResume.js # API for saving resumes
│   │   │   ├── auth.js       # API for authentication
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.js         # Navigation bar
│   │   ├── ResumeForm.js     # Resume form component
│   │   ├── TemplateCard.js   # Template preview component
│   ├── styles/               # Global styles
│   │   ├── globals.css       # Global styles for Tailwind
│   ├── utils/                # Utility functions
│   │   ├── helpers.js        # Helper functions
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.js        # Authentication hook
│   ├── context/              # Global state management
│   │   ├── AuthContext.js    # Authentication context
│   ├── lib/                  # External libraries and configurations
│   │   ├── firebase.js       # Firebase config (if used)
│   │   ├── pdfGenerator.js   # PDF generation logic
│── .env.local                # Environment variables
│── .gitignore                # Git ignore file
│── package.json              # Dependencies and scripts
│── README.md                 # Project documentation
```

## User Journey

### 1️⃣ Landing on the Homepage
- The user visits the website.  
- Sees a **welcome message** with a call-to-action (CTA) like **"Create Your Resume Now"**.  
- Option to **log in** or continue as a guest.  

### 2️⃣ Sign Up / Login
- If the user chooses to **log in**, they can sign in using:  

### 3️⃣ Choosing a Resume Template
- User selects from **multiple templates** (modern, simple, creative, etc.).  
- Preview feature allows users to **see how their resume will look**.  

### 4️⃣ Filling Out Resume Details
- The user enters:  
  - **Personal Information** (Name, Contact, Profile Picture)  
  - **Work Experience** (Company, Job Title, Duration, Description)  
  - **Education** (Degree, Institution, Year)  
  - **Skills & Certifications**  
  - **Projects & Achievements**  

### 5️⃣ Live Preview & Editing
- The resume updates in **real-time** as the user fills in details.  
- The user can **edit, rearrange, or remove sections** as needed.  

### 6️⃣ Downloading the Resume
- The user clicks **"Download as PDF"**.  
- The app generates a **PDF file** using `jsPDF` or `react-to-pdf`.  
- The user downloads and saves the resume on their device.  

### 7️⃣ Saving Resume (For Logged-in Users)
- If the user is logged in, they can:  
  - **Save the resume** for future edits.  
  - **Access previous resumes** from their dashboard.  

### 8️⃣ Accessing User Dashboard (For Logged-in Users)
- The user can:  
  - View **previously saved resumes**.  
  - **Edit** an existing resume.  
  - **Delete** an old resume.

### 9️⃣ Logging Out
- The user can log out from the **profile menu**.

---

## Database Schema / Entities and Their Attributes

### 1. Users  
Stores user account details.  

| Column Name   | Data Type        | Constraints                  | Description |
|--------------|-----------------|------------------------------|-------------|
| `id`         | `UUID`           | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Unique user ID |
| `name`       | `VARCHAR(100)`   | `NOT NULL`                   | User's full name |
| `email`      | `VARCHAR(255)`   | `UNIQUE, NOT NULL`           | User email (for login) |
| `password`   | `TEXT`           | `NOT NULL`                    | Hashed password |
| `created_at` | `TIMESTAMP`      | `DEFAULT now()`              | Account creation timestamp |

---

### 2. Resumes  
Stores resume details for each user.  

| Column Name   | Data Type        | Constraints                  | Description |
|--------------|-----------------|------------------------------|-------------|
| `id`         | `UUID`           | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Unique resume ID |
| `user_id`    | `UUID`           | `REFERENCES Users(id) ON DELETE CASCADE` | Links resume to a user |
| `title`      | `VARCHAR(255)`   | `NOT NULL`                   | Resume title |
| `template`   | `TEXT`           | `NOT NULL`                   | JSON storing template structure |
| `created_at` | `TIMESTAMP`      | `DEFAULT now()`              | Resume creation timestamp |
| `updated_at` | `TIMESTAMP`      | `DEFAULT now()`              | Last modified timestamp |

---

### 3. Resume Sections  
Each section of a resume (experience, education, skills, etc.).  

| Column Name   | Data Type        | Constraints                  | Description |
|--------------|-----------------|------------------------------|-------------|
| `id`         | `UUID`           | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Unique section ID |
| `resume_id`  | `UUID`           | `REFERENCES Resumes(id) ON DELETE CASCADE` | Links to a resume |
| `type`       | `VARCHAR(50)`    | `NOT NULL`                   | Section type (e.g., "experience", "education") |
| `content`    | `JSONB`          | `NOT NULL`                   | Stores section data in JSON format |

---

### 4. Experiences  
Stores work experience details.  

| Column Name   | Data Type        | Constraints                  | Description |
|--------------|-----------------|------------------------------|-------------|
| `id`         | `UUID`           | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Unique experience ID |
| `resume_id`  | `UUID`           | `REFERENCES Resumes(id) ON DELETE CASCADE` | Links to a resume |
| `company`    | `VARCHAR(255)`   | `NOT NULL`                   | Company name |
| `position`   | `VARCHAR(255)`   | `NOT NULL`                   | Job title |
| `start_date` | `DATE`           | `NOT NULL`                   | Start date |
| `end_date`   | `DATE`           | `NULLABLE`                   | End date (null if current job) |
| `description`| `TEXT`           | `NOT NULL`                   | Job responsibilities |

---

### 5. Education  
Stores education details.  

| Column Name   | Data Type        | Constraints                  | Description |
|--------------|-----------------|------------------------------|-------------|
| `id`         | `UUID`           | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Unique education ID |
| `resume_id`  | `UUID`           | `REFERENCES Resumes(id) ON DELETE CASCADE` | Links to a resume |
| `institution`| `VARCHAR(255)`   | `NOT NULL`                   | School/University name |
| `degree`     | `VARCHAR(255)`   | `NOT NULL`                   | Degree obtained |
| `field`      | `VARCHAR(255)`   | `NULLABLE`                   | Field of study |
| `start_date` | `DATE`           | `NOT NULL`                   | Start date |
| `end_date`   | `DATE`           | `NULLABLE`                   | End date (null if ongoing) |

---

### 6. Skills  
Stores skills related to a resume.  

| Column Name   | Data Type        | Constraints                  | Description |
|--------------|-----------------|------------------------------|-------------|
| `id`         | `UUID`           | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Unique skill ID |
| `resume_id`  | `UUID`           | `REFERENCES Resumes(id) ON DELETE CASCADE` | Links to a resume |
| `name`       | `VARCHAR(100)`   | `NOT NULL`                   | Skill name |
| `proficiency`| `VARCHAR(50)`    | `DEFAULT 'Intermediate'`     | Proficiency level (Beginner, Intermediate, Expert) |

---

### 7. Projects  
Stores project details.  

| Column Name   | Data Type        | Constraints                  | Description |
|--------------|-----------------|------------------------------|-------------|
| `id`         | `UUID`           | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Unique project ID |
| `resume_id`  | `UUID`           | `REFERENCES Resumes(id) ON DELETE CASCADE` | Links to a resume |
| `title`      | `VARCHAR(255)`   | `NOT NULL`                   | Project title |
| `description`| `TEXT`           | `NOT NULL`                   | Project details |
| `link`       | `TEXT`           | `NULLABLE`                   | Link to project/demo |

---

### 8. Certifications  
Stores certifications and awards.  

| Column Name   | Data Type        | Constraints                  | Description |
|--------------|-----------------|------------------------------|-------------|
| `id`         | `UUID`           | `PRIMARY KEY, DEFAULT gen_random_uuid()` | Unique certification ID |
| `resume_id`  | `UUID`           | `REFERENCES Resumes(id) ON DELETE CASCADE` | Links to a resume |
| `name`       | `VARCHAR(255)`   | `NOT NULL`                   | Certification name |
| `issuer`     | `VARCHAR(255)`   | `NOT NULL`                   | Issuing organization |
| `date_issued`| `DATE`           | `NOT NULL`                   | Date of certification |
| `credential_url` | `TEXT`       | `NULLABLE`                   | Verification URL |

---

## Relationships Between Entities  
- A **User** can have **multiple Resumes**.  
- Each **Resume** contains multiple **Sections** (Experience, Education, Skills, etc.).  
- **Experience, Education, Skills, Projects, and Certifications** are linked to a **Resume**.  

---

## Neon Postgres Features to Use
- **Serverless Auto-Scaling:** No manual DB scaling required.  
- **JSONB Support:** Store dynamic resume sections in a flexible format.  
- **Foreign Key Constraints:** Ensure data consistency across entities.  
- **Indexing for Faster Queries:** Index `user_id` and `resume_id` for performance.  

---

## API ROUTES

api/
  |-- users/
    |-- index # GET all
    |-- auth/
      |-- register.js # POST for register
      |-- login.js # POST for login
    |-- id/
      |-- [id].js # DELETE
    |-- [username]/ # NESTING RESUME IN USERNAME?? HOW ABOUT IT?
      |-- index.js # GET, PUT by username
      |-- resumes/
        |-- index.js # GET(all) and POST handler
        |-- username/
          |-- [username].js # GET only
        |-- id
          |-- [id].js # remaining request