import UserRepository from "@/repositories/UserRepository";
import corsMiddleware from "@/middlewares/corsMiddleware";

export default async function handler(req, res) {
  await corsMiddleware(req, res);
  if (req.method === 'POST') {
    try {
      const newUser = await UserRepository.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user.' });
    } 
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
