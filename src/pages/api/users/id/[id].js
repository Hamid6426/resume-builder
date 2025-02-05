import UserRepository from "@/repositories/UserRepository";
import cors from "@/lib/middlewares/corsMiddleware";

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await UserRepository.deleteUser(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
