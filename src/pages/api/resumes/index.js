import ResumeRepository from "@/repositories/ResumeRepository";

export default async function handler(req, res) {
  const userId = req.user.id;  // Assuming authenticated user ID is available here

  if (req.method === "POST") {
    try {
      const resume = { ...req.body, user_id: userId };
      const createdResume = await ResumeRepository.createResume(resume);
      res.status(201).json(createdResume);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
