import ResumeRepository from "@/repositories/ResumeRepository";
import corsMiddleware from "@/middlewares/corsMiddleware";
import authMiddleware from "@/middlewares/authMiddleware";

export default async function handler(req, res) {
  await corsMiddleware(req, res);
  await authMiddleware(req, res);

  const { user_id } = req.query;

  switch (req.method) {
    case "POST":
      try {
        const resume = { ...req.body, user_id };
        const createdResume = await ResumeRepository.createResume(resume);
        res.status(201).json(createdResume);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case "GET":
      try {
        const resumes = await ResumeRepository.getAllResumesByUserId(user_id);
        res.status(200).json(resumes);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
