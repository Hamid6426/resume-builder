import corsMiddleware from "@/middlewares/corsMiddleware";
import UserRepository from "@/repositories/UserRepository";

export default async function handler(req, res) {
  await corsMiddleware(req, res);

  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    if (req.method === "GET") {
      const user = await UserRepository.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } 

    if (req.method === "PUT") {
      const { user_id, name, email, password } = req.body;
      if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const updatedUser = await UserRepository.updateUser(user_id, { name, username, email, password });
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(updatedUser);
    } 

    if (req.method === "PATCH") {
      const { user_id, ...updates } = req.body;
      if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
      }
      const patchedUser = await UserRepository.patchUser(user_id, updates);
      if (!patchedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(patchedUser);
    }

    res.status(405).json({ error: "Method not allowed" });

  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
