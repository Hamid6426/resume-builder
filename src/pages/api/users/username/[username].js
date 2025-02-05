import { getUserByUsername, updateUser, deleteUser } from '@/lib/services/userService';
import cors from '@/lib/middlewares/corsMiddleware';

export default async function handler(req, res) {
  await cors(req, res);
  const { username } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(`Error fetching user with username ${username}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
