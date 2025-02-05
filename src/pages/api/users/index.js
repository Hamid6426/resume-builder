import { registerUser, getAllUsers } from '@/lib/services/userService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const userData = req.body;
      const user = await registerUser(userData);
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
