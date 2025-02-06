// pages/api/resumes/[id].js
import ResumeRepository from "@/repositories/ResumeRepository";
import corsMiddleware from "@/middlewares/corsMiddleware";
import authMiddleware from "@/middlewares/authMiddleware";

export default async function handler(req, res) {
  await corsMiddleware(req, res);
  await authMiddleware(req, res);

  const { id } = req.query;

  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!id) {
    return res.status(400).json({ error: "Resume ID is required" });
  }

  switch (req.method) {
    case "GET":
      try {
        const resume = await ResumeRepository.getResumeById(id);
        if (!resume) {
          return res.status(404).json({ error: "Resume not found" });
        }
        res.status(200).json(resume);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch resume." });
      }
      break;

    case "PUT":
      const { title, summary } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }
      try {
        const updatedResume = await ResumeRepository.updateResume(id, { title, summary });
        res.status(200).json(updatedResume);
      } catch (error) {
        res.status(500).json({ error: "Failed to update resume." });
      }
      break;

    case "PATCH":
      const updates = req.body;
      try {
        const patchedResume = await ResumeRepository.patchResume(id, updates);
        res.status(200).json(patchedResume);
      } catch (error) {
        res.status(500).json({ error: "Failed to patch resume." });
      }
      break;

    case "DELETE":
      try {
        const deletedResume = await ResumeRepository.deleteResume(id);
        res.status(200).json(deletedResume);
      } catch (error) {
        res.status(500).json({ error: "Failed to delete resume." });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
