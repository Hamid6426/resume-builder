import ResumeRepository from "@/repositories/ResumeRepository";
import corsMiddleware from "@/middlewares/corsMiddleware";
import authMiddleware from "@/middlewares/authMiddleware";

export default async function handler(req, res) {
  await corsMiddleware(req, res);
  await authMiddleware(req, res);

  const { id } = req.query; // it is requesting resume's id

  try {
    const resume = await ResumeRepository.getResumeById(id);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    if (resume.userId !== req.user?.userId) {
      return res.status(403).json({ error: "Forbidden: You don't own this resume." });
    }
    

    switch (req.method) {
      case "GET":
        res.status(200).json(resume);
        break;

      case "PUT":
        const updatedResume = await ResumeRepository.updateResumeById(
          id,
          req.body
        );
        res.status(200).json(updatedResume);
        break;

      case "PATCH":
        const patchedResume = await ResumeRepository.patchResumeById(
          id,
          req.body
        );
        res.status(200).json(patchedResume);
        break;

      case "DELETE":
        const deletedResume = await ResumeRepository.deleteResumeById(id);
        res.status(200).json(deletedResume);
        break;

      default:
        res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
