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

  if (req.method === "POST") {
    const { user_id, title, summary } = req.body;
    if (!user_id || !title) {
      return res.status(400).json({ error: "User ID and title are required" });
    }
    if (resume.user_id !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    try {
      const newResume = await ResumeRepository.createResume({ user_id, title, summary });
      res.status(201).json(newResume);
    } catch (error) {
      res.status(500).json({ error: "Failed to create resume." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
