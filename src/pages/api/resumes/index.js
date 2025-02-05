import { createResume, getAllResumes } from "@/lib/services/resumeService";
import authMiddleware from "@/lib/middlewares/authMiddleware";
import cors from "@/lib/middlewares/corsMiddleware";

export default async function handler(req, res) {
  await cors(req, res);
  switch (req.method) {
    case "GET":
      try {
        const resumes = await getAllResumes();
        return res.status(200).json({
          success: true,
          data: resumes,
        });
      } catch (error) {
        console.error("Failed to get all resumes:", error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

    case "POST":
      await authMiddleware(req, res, async () => {
        try {
          const { userId, title, description, education, experience, skills } = req.body;

          if (!userId || !title) {
            return res.status(400).json({ error: "Missing required fields: userId, title" });
          }

          const sanitizedTitle = title.replace(/[^a-zA-Z0-9 ]/g, "");
          const sanitizedDescription = description ? description.replace(/[^a-zA-Z0-9 .,!?'-]/g, "") : "";
          const sanitizedSkills = skills && Array.isArray(skills) ? skills.map(skill => skill.replace(/[^a-zA-Z0-9 ]/g, "")) : [];

          const sanitizedEducation = education && Array.isArray(education)
            ? education.map(ed => ({
                school: ed.school?.replace(/[^a-zA-Z0-9 ]/g, ""),
                degree: ed.degree?.replace(/[^a-zA-Z0-9 ]/g, ""),
                fieldOfStudy: ed.fieldOfStudy?.replace(/[^a-zA-Z0-9 ]/g, ""),
                startDate: ed.startDate ? new Date(ed.startDate) : null,
                endDate: ed.endDate ? new Date(ed.endDate) : null,
              }))
            : [];

          const sanitizedExperience = experience && Array.isArray(experience)
            ? experience.map(exp => ({
                company: exp.company?.replace(/[^a-zA-Z0-9 ]/g, ""),
                position: exp.position?.replace(/[^a-zA-Z0-9 ]/g, ""),
                description: exp.description?.replace(/[^a-zA-Z0-9 .,!?'-]/g, ""),
                startDate: exp.startDate ? new Date(exp.startDate) : null,
                endDate: exp.endDate ? new Date(exp.endDate) : null,
              }))
            : [];

          const resume = await createResume({
            userId,
            title: sanitizedTitle,
            description: sanitizedDescription,
            education: sanitizedEducation,
            experience: sanitizedExperience,
            skills: sanitizedSkills,
          });

          return res.status(201).json(resume);
        } catch (error) {
          console.log("Resume creation error:", error);
          return res.status(500).json({ error: error.message });
        }
      });
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
