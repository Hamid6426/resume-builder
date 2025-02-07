import UserRepository from "@/repositories/UserRepository";
import corsMiddleware from "@/middlewares/corsMiddleware";

export default async function handler(req, res) {
  await corsMiddleware(req, res);
  const { user_id } = req.query;

  console.log("Received user_id:", user_id); // Log user_id

  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (req.method === "DELETE") {
    try {
      await UserRepository.deleteUser(user_id);
      res.status(204).end();
    } catch (error) {
      console.error("Delete error:", error); // Log error
      res.status(500).json({ error: "Failed to delete user." });
    }
  } else if (req.method === "GET") {
    try {
      const user = await UserRepository.getUserById(user_id);
      console.log("Retrieved user:", user); // Log user object
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Get error:", error); // Log error
      res.status(500).json({ error: "Failed to retrieve user." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
