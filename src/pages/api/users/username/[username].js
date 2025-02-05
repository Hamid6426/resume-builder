import corsMiddleware from "@/middlewares/corsMiddleware";
import UserRepository from "@/repositories/UserRepository";

export default async function handler(req, res) {
  await corsMiddleware(req, res);

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  if (req.method === "GET") {
    try {
      const user = await UserRepository.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve user." });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedUser = await UserRepository.updateUser(req.body.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user." });
    }
  } else if (req.method === "PATCH") {
    try {
      const patchedUser = await UserRepository.patchUser(req.body.id, req.body);
      if (!patchedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(patchedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to patch user." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
