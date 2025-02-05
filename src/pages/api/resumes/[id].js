import { getResumeById, updateResume, deleteResume } from "@/lib/services/resumeService";
import authMiddleware from "@/lib/middlewares/authMiddleware";
import cors from "@/lib/middlewares/corsMiddleware";

export default async function handler(req, res) {
  await cors(req, res);
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Resume ID is required.",
    });
  }

  switch (req.method) {
    case "GET":
      try {
        const resume = await getResumeById(id);
        return res.status(200).json({
          success: true,
          data: resume,
        });
      } catch (error) {
        console.error("Error fetching resume:", error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    case "PATCH": // Update handler
      await authMiddleware(req, res, async () => {
        try {
          const { title, description, education, experience, skills } = req.body;

          // Basic validation
          if (!title) {
            return res.status(400).json({ error: "Title is required" });
          }

          // Sanitize input to prevent any injection
          const sanitizedTitle = title.replace(/[^a-zA-Z0-9 ]/g, "");
          const sanitizedDescription = description ? description.replace(/[^a-zA-Z0-9 .,!?"'-]/g, "") : "";

          const updatedResume = await updateResume(id, {
            title: sanitizedTitle,
            description: sanitizedDescription,
            education,
            experience,
            skills,
          });

          return res.status(200).json({
            success: true,
            data: updatedResume,
          });
        } catch (error) {
          console.error("Error updating resume:", error);
          return res.status(500).json({
            success: false,
            message: error.message,
          });
        }
      });
      break;
    case "DELETE":
      await authMiddleware(req, res, async () => {
        try {
          const deletedResume = await deleteResume(id);
          return res.status(200).json({
            success: true,
            data: deletedResume,
          });
        } catch (error) {
          console.error("Error deleting resume:", error);
          return res.status(500).json({
            success: false,
            message: error.message,
          });
        }
      });
      break;
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}