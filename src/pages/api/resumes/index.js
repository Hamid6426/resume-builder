import authMiddleware from "@/middleware/authMiddleware"; // Ensure correct path to middleware
import ResumeRepository from "@/repositories/ResumeRepository";

export default async function handler(req, res) {
  try {
    await corsMiddleware(req, res);
    await authMiddleware(req, res);
    // const { userId } = req.query;
    const userid = req.user?.userId; // instead fetch from token

    if (req.method === "POST") {
      const resume = { ...req.body, userid }; // Attach userId to resume
      const createdResume = await ResumeRepository.createResume(resume);
      return res.status(201).json(createdResume);
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
