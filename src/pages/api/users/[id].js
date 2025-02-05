import { getUserById, updateUser, deleteUser } from '@/lib/services/userService';
import cors from '@/lib/middlewares/corsMiddleware';

export default async function handler(req, res) {
  await cors(req, res);
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await getUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const userData = req.body;
      const user = await updateUser(id, userData);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const user = await deleteUser(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).end();
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
  