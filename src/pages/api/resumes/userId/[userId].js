import ResumeRepository from "@/repositories/ResumeRepository";
import corsMiddleware from "@/middlewares/corsMiddleware";
import authMiddleware from "@/middlewares/authMiddleware";

export default async function handler(req, res) {
  await corsMiddleware(req, res);
  await authMiddleware(req, res);

  const { userId } = req.query;
  console.log(`Received request for userId: ${userId}`); 

  switch (req.method) {
    case "POST":
      try {
        const resume = { ...req.body, userId };
        const createdResume = await ResumeRepository.createResume(resume);
        res.status(201).json(createdResume);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case "GET":
      try {
        const resumes = await ResumeRepository.getAllResumesByUserId(userId);
        if (resumes.length === 0) {
          res.status(404).json({ error: "No resumes found for this user." });
        } else {
          res.status(200).json(resumes);
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
