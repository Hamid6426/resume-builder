import UserRepository from "@/repositories/UserRepository";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const users = await UserRepository.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve users." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
