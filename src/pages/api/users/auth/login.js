import UserRepository from "@/repositories/UserRepository";
import corsMiddleware from "@/middlewares/corsMiddleware";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await corsMiddleware(req, res);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const { email, password } = req.body;
    const user = await UserRepository.getUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in user.' });
  }
}
